import { eq } from 'drizzle-orm'
import { getDb, schema } from '~~/server/db'
import { getUserSession } from '~~/server/utils/session'

const { users } = schema

export default defineEventHandler(async (event) => {
  const userId = getUserSession(event)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Belum login' })
  }

  const db = getDb()
  const result = await db.select({
    id: users.id,
    email: users.email,
    name: users.name,
    role: users.role
  }).from(users).where(eq(users.id, userId)).limit(1)

  const user = result[0]
  if (!user) {
    throw createError({ statusCode: 401, message: 'User tidak ditemukan' })
  }

  return user
})
