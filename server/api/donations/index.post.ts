import { paymentService } from '../../services/payment/payment.service'
import { getUserSession } from '../../utils/session'
import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

const { users } = schema

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sessionUserId = getUserSession(event)

  let donaturName = body.donaturName || body.guestName
  let donaturEmail = body.donaturEmail || body.guestEmail

  if (sessionUserId && (!donaturName || !donaturEmail)) {
    const db = getDb()
    const [user] = await db.select().from(users).where(eq(users.id, sessionUserId)).limit(1)
    if (user) {
      if (!donaturName) donaturName = user.name
      if (!donaturEmail) donaturEmail = user.email
    }
  }

  try {
    const donation = await paymentService.initiateDonation({
      campaignId: body.campaignId,
      userId: sessionUserId || body.userId, 
      donaturName,
      donaturEmail,
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
