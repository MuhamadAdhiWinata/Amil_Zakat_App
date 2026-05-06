import { getDb, schema } from '~~/server/db'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { setUserSession } from '~~/server/utils/session'

const { users } = schema

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email dan password harus diisi' })
  }

  const db = getDb()
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
  const user = result[0]

  if (!user || !user.password) {
    throw createError({ statusCode: 401, message: 'Email atau password salah' })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Email atau password salah' })
  }

  setUserSession(event, user.id)

  return { success: true }
})
