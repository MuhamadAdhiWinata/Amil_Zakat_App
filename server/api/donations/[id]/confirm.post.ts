import { donationRepository } from '../../../repositories/donation.repository'
import { getDb } from '../../../db'
import { campaigns } from '../../../db/schema'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID donasi tidak valid' })
  }

  const body = await readBody(event)
  const status = body.status || 'COMPLETED'

  if (!['COMPLETED', 'CANCELLED'].includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'Status tidak valid' })
  }

  const donation = await donationRepository.findById(id)
  if (!donation) {
    throw createError({ statusCode: 404, statusMessage: 'Donasi tidak ditemukan' })
  }

  if (donation.status !== 'INITIATED' && donation.status !== 'WAITING_PAYMENT') {
    throw createError({ statusCode: 400, statusMessage: 'Donasi sudah diproses sebelumnya' })
  }

  if (status === 'COMPLETED') {
    const paidAt = new Date()
    await donationRepository.updateStatus(id, 'COMPLETED', paidAt)
    const db = getDb()
    await db.update(campaigns)
      .set({ currentAmount: sql`${campaigns.currentAmount} + ${donation.amount}` })
      .where(eq(campaigns.id, donation.campaignId))
  } else {
    await donationRepository.updateStatus(id, 'CANCELLED')
  }

  return { success: true, status }
})
