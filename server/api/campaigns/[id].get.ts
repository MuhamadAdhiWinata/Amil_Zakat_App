import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

const { campaigns } = schema

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'ID diperlukan' })

  const db = getDb()
  const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1)
  const campaign = result[0]

  if (!campaign) throw createError({ statusCode: 404, message: 'Program tidak ditemukan' })

  return {
    ...campaign,
    targetAmount: Number(campaign.targetAmount),
    currentAmount: Number(campaign.currentAmount)
  }
})
