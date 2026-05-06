import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id as string
  const db = getDb()
  
  await db.delete(schema.categories).where(eq(schema.categories.id, id))
  
  return { success: true }
})
