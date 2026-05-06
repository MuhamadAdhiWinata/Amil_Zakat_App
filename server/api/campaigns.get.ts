import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

const { campaigns, categories } = schema

export default defineEventHandler(async () => {
  const db = getDb()
  const result = await db.select({
    id: campaigns.id,
    title: campaigns.title,
    description: campaigns.description,
    image: campaigns.image,
    targetAmount: campaigns.targetAmount,
    currentAmount: campaigns.currentAmount,
    status: campaigns.status,
    createdAt: campaigns.createdAt,
    categoryName: categories.name,
    categoryIcon: categories.icon
  })
  .from(campaigns)
  .leftJoin(categories, eq(campaigns.categoryId, categories.id))
  .where(eq(campaigns.status, 'active'))
  
  // Convert decimals to numbers
  return result.map(c => ({
    ...c,
    targetAmount: Number(c.targetAmount),
    currentAmount: Number(c.currentAmount)
  }))
})
