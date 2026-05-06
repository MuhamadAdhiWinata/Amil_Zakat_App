import { getDb, schema } from '~~/server/db'

export default defineEventHandler(async () => {
  const db = getDb()
  return await db.select().from(schema.categories)
})
