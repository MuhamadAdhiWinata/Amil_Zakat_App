import { getDb, schema } from '~~/server/db'
import { getUserSession } from '~~/server/utils/session'
import { eq } from 'drizzle-orm'

const { campaigns, users } = schema

export default defineEventHandler(async (event) => {
  const userId = getUserSession(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const db = getDb()
  const dbUsers = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  const user = dbUsers[0]

  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  const body = await readBody(event)
  const { title, description, targetAmount, image } = body

  if (!title || !description || !targetAmount) {
    throw createError({ statusCode: 400, message: 'Data tidak lengkap' })
  }

  const id = crypto.randomUUID()
  await db.insert(campaigns).values({
    id,
    title,
    description,
    targetAmount: targetAmount.toString(),
    image: image || null,
    status: 'active'
  })

  return { success: true, campaignId: id }
})
