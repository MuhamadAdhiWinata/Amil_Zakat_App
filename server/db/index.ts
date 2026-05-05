import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema'

let _db: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (!_db) {
    const poolConnection = mysql.createPool({
      uri: process.env.DATABASE_URL,
    })
    _db = drizzle(poolConnection, { schema, mode: 'default' })
  }
  return _db
}

export { schema }
