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

export const categories = mysqlTable('categories', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  icon: varchar('icon', { length: 50 }), // Lucide icon name
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const campaigns = mysqlTable('campaigns', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  image: varchar('image', { length: 255 }),
  targetAmount: decimal('target_amount', { precision: 15, scale: 2 }).notNull(),
  currentAmount: decimal('current_amount', { precision: 15, scale: 2 }).notNull().default('0'),
  categoryId: varchar('category_id', { length: 36 }),
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, closed
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const donations = mysqlTable('donations', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }),
  campaignId: varchar('campaign_id', { length: 36 }).notNull(),
  donaturName: varchar('donatur_name', { length: 255 }),
  donaturEmail: varchar('donatur_email', { length: 255 }),
  donaturPhone: varchar('donatur_phone', { length: 20 }),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  isAnonymous: boolean('is_anonymous').notNull().default(false),
  status: varchar('status', { length: 50 }).notNull().default('INITIATED'), // INITIATED, WAITING_PAYMENT, COMPLETED, CANCELLED
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  completedAt: timestamp('completed_at'),
})

export const payments = mysqlTable('payments', {
  id: varchar('id', { length: 36 }).primaryKey(),
  donationId: varchar('donation_id', { length: 36 }).notNull(),
  gateway: varchar('gateway', { length: 50 }).notNull().default('PAKASIR'),
  gatewayMethod: varchar('gateway_method', { length: 50 }), // qris, bri_va, etc
  gatewayOrderId: varchar('gateway_order_id', { length: 100 }).unique(),
  gatewayReference: varchar('gateway_reference', { length: 255 }),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  fee: decimal('fee', { precision: 15, scale: 2 }),
  totalPayment: decimal('total_payment', { precision: 15, scale: 2 }),
  status: varchar('status', { length: 50 }).notNull().default('PENDING'), // PENDING, PAID, FAILED, EXPIRED
  qrString: text('qr_string'),
  vaNumber: varchar('va_number', { length: 50 }),
  expiredAt: timestamp('expired_at'),
  paidAt: timestamp('paid_at'),
  rawResponse: json('raw_response'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
})

export const paymentLogs = mysqlTable('payment_logs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  paymentId: varchar('payment_id', { length: 36 }),
  type: varchar('type', { length: 50 }).notNull(), // WEBHOOK, API_REQUEST, API_RESPONSE, STATUS_CHECK
  direction: varchar('direction', { length: 10 }).notNull(), // IN, OUT
  payload: json('payload').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
})
