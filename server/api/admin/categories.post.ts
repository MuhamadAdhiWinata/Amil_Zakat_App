import { getDb, schema } from '~~/server/db'
import { getUserSession } from '~~/server/utils/session'
import { users } from '~~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const userId = getUserSession(event)
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = getDb()
  const admin = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  if (!admin[0] || (admin[0].role !== 'admin' && admin[0].role !== 'super_admin')) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const body = await readBody(event)
  
  const id = crypto.randomUUID()
  const slug = body.name.toLowerCase().replace(/ /g, '-')
  
  await db.insert(schema.categories).values({
    id,
    name: body.name,
    slug,
    icon: body.icon || 'LayoutGrid'
  })
  
  return { success: true, id }
})
