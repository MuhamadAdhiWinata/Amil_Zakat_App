import { getDb, schema } from '~~/server/db'
import { getUserSession } from '~~/server/utils/session'
import { eq, desc } from 'drizzle-orm'

const { donations, users, campaigns } = schema

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

  // Fetch all donations with basic info
  // For simplicity, we just fetch donations and we can map them
  const allDonations = await db.select().from(donations).orderBy(desc(donations.createdAt))

  return allDonations
})
