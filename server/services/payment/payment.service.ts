import { donationRepository } from '../../repositories/donation.repository'
import { paymentRepository } from '../../repositories/payment.repository'
import { pakasirService } from './pakasir.service'
import { appEvents, EVENTS } from '../../utils/events'
import type { PaymentMethod } from '~/shared/types/donation'
import crypto from 'node:crypto'
import { getDb } from '../../db'
import { payments } from '../../db/schema'
import { eq } from 'drizzle-orm'

export class PaymentService {
  async initiateDonation(data: {
    campaignId: string
    userId?: string
    donaturName: string
    donaturEmail: string
    donaturPhone: string
    amount: number
    isAnonymous: boolean
  }) {
    const donationId = crypto.randomUUID()
    const donaturName = data.donaturName?.trim() || 'Anonim'
    const donaturEmail = data.donaturEmail?.trim() || ''

    const donation = await donationRepository.create({
      id: donationId,
      ...data,
      donaturName,
      donaturEmail,
      amount: data.amount.toString(),
      status: 'INITIATED'
    })

    appEvents.emit(EVENTS.DONATION_CREATED, donation)
    return donation
  }

  async checkout(donationId: string, method: PaymentMethod) {
    const donation = await donationRepository.findById(donationId)
    if (!donation) throw new Error('Donation not found')

    if (Number(donation.amount) < 500) {
      throw new Error('Nominal donasi minimal Rp 500')
    }

    const paymentId = crypto.randomUUID()
    const gatewayOrderId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // 1. Create Payment record (PENDING)
    await paymentRepository.create({
      id: paymentId,
      donationId,
      gateway: 'PAKASIR',
      gatewayMethod: method,
      gatewayOrderId,
      amount: donation.amount,
      status: 'PENDING',
    })

    // 2. Update Donation status (WAITING_PAYMENT)
    await donationRepository.updateStatus(donationId, 'WAITING_PAYMENT')

    // 3. Call Gateway
    try {
      const gatewayRes = await pakasirService.createTransaction({
        orderId: gatewayOrderId,
        amount: Number(donation.amount),
        method,
      })

      if (gatewayRes.payment) {
        const paymentData = gatewayRes.payment
        // Update payment with gateway references
        const db = getDb() 
        await db.update(payments)
          .set({ 
            gatewayReference: paymentData.payment_number,
            fee: paymentData.fee?.toString(),
            totalPayment: paymentData.total_payment?.toString(),
            qrString: method === 'qris' ? paymentData.payment_number : null,
            vaNumber: method !== 'qris' ? paymentData.payment_number : null,
            expiredAt: paymentData.expired_at ? new Date(paymentData.expired_at) : null,
            rawResponse: gatewayRes
          })
          .where(eq(payments.id, paymentId))

        appEvents.emit(EVENTS.PAYMENT_CREATED, { donationId, paymentId })
        
        return {
          paymentId,
          gatewayOrderId,
          qrData: method === 'qris' ? paymentData.payment_number : null,
          vaNumber: method !== 'qris' ? paymentData.payment_number : null,
          expiredAt: paymentData.expired_at
        }
      } else {
        throw new Error('Gagal mendapatkan data pembayaran dari Pakasir')
      }
    } catch (error: any) {
      console.error('[PaymentService] Gateway error:', error)
      await paymentRepository.updateStatus(paymentId, 'FAILED')
      throw error
    }
  }

  async handleWebhook(payload: any) {
    // Pakasir webhook usually sends order_id and status
    const orderId = payload.order_id || payload.data?.order_id
    if (!orderId) throw new Error('Invalid webhook payload: order_id missing')

    console.log('[PaymentService] Webhook received for order_id:', orderId)
    appEvents.emit(EVENTS.WEBHOOK_RECEIVED, payload)

    const db = getDb()
    const payment = await db.query.payments.findFirst({
      where: (payments, { eq }) => eq(payments.gatewayOrderId, orderId)
    })

    if (payment) {
      await paymentRepository.log({
        id: crypto.randomUUID(),
        paymentId: payment.id,
        type: 'WEBHOOK',
        direction: 'IN',
        payload
      })

      // 2. VERIFY via transactiondetail (IMPORTANT)
      // Pakasir requires: project, amount, order_id, api_key
      const detail = await pakasirService.getTransactionDetail(payment.gatewayOrderId!, Number(payment.amount))
      
      if (detail.transaction && detail.transaction.status === 'completed') {
        if (payment.status !== 'PAID') {
          // Process settlement
          await this.settlePayment(payment.id, detail.transaction.completed_at)
        }
      } else if (detail.transaction && detail.transaction.status === 'expired') {
          await this.expirePayment(payment.id)
      }
    }
  }

  async settlePayment(paymentId: string, paidAtStr?: string) {
    const payment = await paymentRepository.findById(paymentId)
    if (!payment) return

    const paidAt = paidAtStr ? new Date(paidAtStr) : new Date()

    // 1. Update Payment
    await paymentRepository.updateStatus(paymentId, 'PAID', paidAt)

    // 2. Update Donation
    await donationRepository.updateStatus(payment.donationId, 'COMPLETED', paidAt)

    appEvents.emit(EVENTS.PAYMENT_PAID, { paymentId, donationId: payment.donationId })
    console.log('[PaymentService] Payment settled:', paymentId)
  }

  async expirePayment(paymentId: string) {
    const payment = await paymentRepository.findById(paymentId)
    if (!payment) return

    await paymentRepository.updateStatus(paymentId, 'EXPIRED')
    console.log('[PaymentService] Payment expired:', paymentId)
    appEvents.emit(EVENTS.PAYMENT_EXPIRED, paymentId)
  }
}

export const paymentService = new PaymentService()
