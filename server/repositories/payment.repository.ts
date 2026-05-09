import { eq } from 'drizzle-orm'
import { payments, paymentLogs } from '../db/schema'
import type { PaymentStatus } from '~/shared/types/donation'
import { getDb } from '../db'

export class PaymentRepository {
  async create(data: typeof payments.$inferInsert) {
    const db = getDb()
    await db.insert(payments).values(data)
    return data
  }

  async findById(id: string) {
    const db = getDb()
    const result = await db.select().from(payments).where(eq(payments.id, id))
    return result[0]
  }

  async findByGatewayOrderId(orderId: string) {
    const db = getDb()
    const result = await db.select().from(payments).where(eq(payments.gatewayOrderId, orderId))
    return result[0]
  }

  async updateStatus(id: string, status: PaymentStatus, paidAt?: Date) {
    const db = getDb()
    await db.update(payments)
      .set({ 
        status, 
        ...(paidAt ? { paidAt } : {}),
        updatedAt: new Date()
      })
      .where(eq(payments.id, id))
  }

  async log(data: typeof paymentLogs.$inferInsert) {
    const db = getDb()
    await db.insert(paymentLogs).values(data)
    return data
  }
}

export const paymentRepository = new PaymentRepository()
