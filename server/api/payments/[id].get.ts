import { paymentRepository } from '../../repositories/payment.repository'
import { paymentService } from '../../services/payment/payment.service'
import { pakasirService } from '../../services/payment/pakasir.service'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'Invalid ID' })

  const payment = await paymentRepository.findById(id)
  if (!payment) throw createError({ statusCode: 404, message: 'Payment not found' })

  const mapPayment = (p: typeof payment) => ({ ...p, amount: Number(p.amount), fee: p.fee ? Number(p.fee) : undefined, totalPayment: p.totalPayment ? Number(p.totalPayment) : undefined })

  // Auto-sync with Pakasir if still PENDING
  if (payment.status === 'PENDING' && payment.gatewayOrderId) {
    try {
      const detail = await pakasirService.getTransactionDetail(payment.gatewayOrderId, Number(payment.amount))
      if (detail.transaction && detail.transaction.status === 'completed') {
        await paymentService.settlePayment(payment.id, detail.transaction.completed_at)
        const updated = await paymentRepository.findById(id)
        return updated ? mapPayment(updated) : mapPayment(payment)
      }
    } catch (err) {
      console.error('[Payment Sync Error]', err)
    }
  }

  return mapPayment(payment)
})
