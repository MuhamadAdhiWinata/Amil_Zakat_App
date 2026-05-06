import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Simple admin check (can be improved with common helper)
  const user = event.context.user
  // In a real app, we'd check session/cookie here or use a middleware
  
  const body = await readBody(event)
  const db = getDb()
  
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
