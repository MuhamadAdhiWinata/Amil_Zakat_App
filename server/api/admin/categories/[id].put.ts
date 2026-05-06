import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string
  const body = await readBody(event)
  const db = getDb()
  
  const slug = body.name.toLowerCase().replace(/ /g, '-')
  
  await db.update(schema.categories)
    .set({
      name: body.name,
      slug,
      icon: body.icon
    })
    .where(eq(schema.categories.id, id))
  
  return { success: true }
})
