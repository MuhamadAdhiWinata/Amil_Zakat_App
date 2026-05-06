import { getDb } from '../server/db'
import { sql } from 'drizzle-orm'
import 'dotenv/config'

async function dropAll() {
  const db = getDb()
  console.log('Dropping all tables...')
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`)
  await db.execute(sql`DROP TABLE IF EXISTS payment_logs`)
  await db.execute(sql`DROP TABLE IF EXISTS donations`)
  await db.execute(sql`DROP TABLE IF EXISTS campaigns`)
  await db.execute(sql`DROP TABLE IF EXISTS categories`)
  await db.execute(sql`DROP TABLE IF EXISTS users`)
  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`)
  console.log('Done.')
  process.exit(0)
}

dropAll().catch(err => {
  console.error(err)
  process.exit(1)
})
