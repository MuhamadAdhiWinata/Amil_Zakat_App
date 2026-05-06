import { getDb, schema } from '~~/server/db'
import { eq, desc } from 'drizzle-orm'
import { getUserSession } from '~~/server/utils/session'

const { donations, campaigns } = schema

export default defineEventHandler(async (event) => {
  const userId = getUserSession(event)
  if (!userId) throw createError({ statusCode: 401, message: 'Belum login' })

  const db = getDb()
  const result = await db.select({
    id: donations.id,
    amount: donations.amount,
    status: donations.status,
    createdAt: donations.createdAt,
    campaignTitle: campaigns.title
  })
  .from(donations)
  .leftJoin(campaigns, eq(donations.campaignId, campaigns.id))
  .where(eq(donations.userId, userId))
  .orderBy(desc(donations.createdAt))

  return result.map(d => ({
    ...d,
    amount: Number(d.amount)
  }))
})
