import { getDb, schema } from '~~/server/db'
import { getUserSession } from '~~/server/utils/session'

const { donations } = schema

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { amount, campaignId, guestName, guestEmail, isAnonymous } = body
  const userId = getUserSession(event)

  if (!amount || !campaignId) {
    throw createError({ statusCode: 400, message: 'Data tidak lengkap' })
  }

  const db = getDb()
  const id = crypto.randomUUID()

  await db.insert(donations).values({
    id,
    userId,
    guestName,
    guestEmail,
    amount: amount.toString(),
    isAnonymous: !!isAnonymous,
    campaignId,
    status: 'PENDING'
  })

  return { success: true, donationId: id }
})
