import { appEvents, EVENTS } from '../utils/events'
import { getDb } from '../db'
import { campaigns } from '../db/schema'
import { eq, sql } from 'drizzle-orm'

export function registerPaymentHandlers() {
  // Update campaign amount when payment is paid
  appEvents.on(EVENTS.PAYMENT_PAID, async ({ paymentId, donationId }) => {
    console.log(`[EventHandler] Processing payment.paid for donation: ${donationId}`)
    
    const db = getDb()
    const donation = await db.query.donations.findFirst({
      where: (donations, { eq }) => eq(donations.id, donationId)
    })

    if (donation) {
      // Increment current_amount in campaigns
      await db.update(campaigns)
        .set({
          currentAmount: sql`${campaigns.currentAmount} + ${donation.amount}`
        })
        .where(eq(campaigns.id, donation.campaignId))
      
      console.log(`[EventHandler] Campaign ${donation.campaignId} updated (+${donation.amount})`)
    }
  })

  appEvents.on(EVENTS.PAYMENT_FAILED, async (paymentId) => {
    console.log(`[EventHandler] Payment failed: ${paymentId}`)
  })

  appEvents.on(EVENTS.WEBHOOK_RECEIVED, async (payload) => {
    console.log(`[EventHandler] Webhook logged:`, JSON.stringify(payload))
  })
}
