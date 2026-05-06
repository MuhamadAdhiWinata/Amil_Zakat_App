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

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID tidak valid' })
  }

  await db.delete(campaigns).where(eq(campaigns.id, id))

  return { success: true }
})
