import { mysqlTable, varchar, text, int, timestamp, json, boolean, decimal } from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }), // Hashed password
  provider: varchar('provider', { length: 50 }).notNull().default('google'), // google, credentials
  role: varchar('role', { length: 50 }).notNull().default('user'), // user, admin, super_admin
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const campaigns = mysqlTable('campaigns', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 255 }),
  targetAmount: decimal('target_amount', { precision: 15, scale: 2 }).notNull(),
  currentAmount: decimal('current_amount', { precision: 15, scale: 2 }).notNull().default('0'),
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, closed
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const donations = mysqlTable('donations', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }),
  guestName: varchar('guest_name', { length: 255 }),
  guestEmail: varchar('guest_email', { length: 255 }),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  isAnonymous: boolean('is_anonymous').notNull().default(false),
  campaignId: varchar('campaign_id', { length: 36 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('PENDING'), // PENDING, PAID, FAILED, EXPIRED
  invoiceId: varchar('invoice_id', { length: 100 }),
  paymentReference: varchar('payment_reference', { length: 255 }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  paidAt: timestamp('paid_at'),
})

export const paymentLogs = mysqlTable('payment_logs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  donationId: varchar('donation_id', { length: 36 }).notNull(),
  payload: json('payload').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})
