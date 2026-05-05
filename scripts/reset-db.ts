import mysql from 'mysql2/promise'
import 'dotenv/config'

async function resetDb() {
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL
  })

  console.log('Dropping tables...')
  await connection.query('SET FOREIGN_KEY_CHECKS = 0')
  await connection.query('DROP TABLE IF EXISTS payment_logs')
  await connection.query('DROP TABLE IF EXISTS donations')
  await connection.query('DROP TABLE IF EXISTS campaigns')
  await connection.query('DROP TABLE IF EXISTS sessions')
  await connection.query('DROP TABLE IF EXISTS users')
  await connection.query('SET FOREIGN_KEY_CHECKS = 1')
  
  console.log('Done.')
  await connection.end()
}

resetDb().catch(console.error)
