import { eq } from 'drizzle-orm'
import { getDb, schema } from '~~/server/db'
import { setUserSession } from '~~/server/utils/session'

const { users } = schema

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    throw createError({ statusCode: 400, message: 'Kode OAuth tidak ditemukan' })
  }

  // Exchange code for token
  const tokenRes = await $fetch<{ access_token: string }>('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: {
      code,
      client_id: config.googleClientId,
      client_secret: config.googleClientSecret,
      redirect_uri: `${config.public.appUrl}/api/auth/callback`,
      grant_type: 'authorization_code',
    },
  }).catch((err) => {
    console.error('OAuth token exchange failed', err)
    throw createError({ statusCode: 400, message: 'Gagal menukar kode OAuth' })
  })

  // Get user info from Google
  const googleUser = await $fetch<{ email: string, name: string }>('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenRes.access_token}` },
  }).catch((err) => {
    console.error('Failed to get user info from Google', err)
    throw createError({ statusCode: 400, message: 'Gagal mengambil data pengguna dari Google' })
  })

  const db = getDb()

  // Find or create user
  const existingUsers = await db.select().from(users).where(eq(users.email, googleUser.email)).limit(1)
  let user = existingUsers[0]

  if (!user) {
    const id = crypto.randomUUID()
    await db.insert(users).values({
      id,
      email: googleUser.email,
      name: googleUser.name,
      provider: 'google',
      role: 'user',
    })
    const newUsers = await db.select().from(users).where(eq(users.id, id)).limit(1)
    user = newUsers[0]
  } else {
    // Update name if changed
    if (user.name !== googleUser.name) {
      await db.update(users).set({ name: googleUser.name }).where(eq(users.id, user.id))
    }
  }

  // Create session
  setUserSession(event, user.id)

  // Redirect to home
  return sendRedirect(event, '/')
})
