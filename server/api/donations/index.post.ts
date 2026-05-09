import { paymentService } from '../../services/payment/payment.service'
import { getUserSession } from '../../utils/session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sessionUserId = getUserSession(event)

  try {
    const donation = await paymentService.initiateDonation({
      campaignId: body.campaignId,
      userId: sessionUserId || body.userId, 
      donaturName: body.donaturName || body.guestName,
      donaturEmail: body.donaturEmail || body.guestEmail,
      donaturPhone: body.donaturPhone || '',
      amount: body.amount,
      isAnonymous: body.isAnonymous,
    })

    return {
      success: true,
      donationId: donation.id,
      data: donation
    }
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message
    })
  }
})
