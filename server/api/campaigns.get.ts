import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

const { campaigns } = schema

export default defineEventHandler(async () => {
  const db = getDb()
  const result = await db.select().from(campaigns).where(eq(campaigns.status, 'active'))
  
  // Convert decimals to numbers
  return result.map(c => ({
    ...c,
    targetAmount: Number(c.targetAmount),
    currentAmount: Number(c.currentAmount)
  }))
})
