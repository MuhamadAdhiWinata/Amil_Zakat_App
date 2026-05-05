import { eq } from 'drizzle-orm'
import { getDb, schema } from '~~/server/db'
import { setUserSession } from '~~/server/utils/session'

const { users } = schema

export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV === 'production') {
    throw createError({ statusCode: 403, message: 'Forbidden in production' })
  }

  const db = getDb()
  const mockEmail = 'admin.mock@example.com'
  
  let existingUsers = await db.select().from(users).where(eq(users.email, mockEmail)).limit(1)
  let user = existingUsers[0]

  if (!user) {
    const id = crypto.randomUUID()
    await db.insert(users).values({
      id,
      email: mockEmail,
      name: 'Admin Mock (Dev)',
      provider: 'mock',
      role: 'super_admin',
    })
    const newUsers = await db.select().from(users).where(eq(users.id, id)).limit(1)
    user = newUsers[0]
  }

  setUserSession(event, user.id)

  return sendRedirect(event, '/')
})
