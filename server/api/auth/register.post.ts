import { getDb, schema } from '~~/server/db'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { setUserSession } from '~~/server/utils/session'

const { users } = schema

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, name } = body

  if (!email || !password || !name) {
    throw createError({ statusCode: 400, message: 'Data tidak lengkap' })
  }

  const db = getDb()
  const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
  
  if (existingUser.length > 0) {
    throw createError({ statusCode: 400, message: 'Email sudah terdaftar' })
  }

  const id = crypto.randomUUID()
  const hashedPassword = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    id,
    email,
    name,
    password: hashedPassword,
    provider: 'credentials',
    role: 'user',
  })

  setUserSession(event, id)

  return { success: true }
})
