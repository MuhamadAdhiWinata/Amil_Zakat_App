import { eq } from 'drizzle-orm'
import { donations } from '../db/schema'
import type { DonationStatus } from '~/shared/types/donation'
import { getDb } from '../db'

export class DonationRepository {
  async create(data: typeof donations.$inferInsert) {
    const db = getDb()
    await db.insert(donations).values(data)
    return data
  }

  async findById(id: string) {
    const db = getDb()
    const result = await db.select().from(donations).where(eq(donations.id, id))
    return result[0]
  }

  async updateStatus(id: string, status: DonationStatus, completedAt?: Date) {
    const db = getDb()
    await db.update(donations)
      .set({ 
        status, 
        ...(completedAt ? { completedAt } : {}) 
      })
      .where(eq(donations.id, id))
  }
}

export const donationRepository = new DonationRepository()
