import { eq } from 'drizzle-orm'
import { getDb, schema } from '~~/server/db'

const { donations, campaigns } = schema

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID donasi tidak valid' })
  }

  const body = await readBody(event)
  const status = body.status || 'PAID'

  if (!['PAID', 'FAILED', 'EXPIRED'].includes(status)) {
    throw createError({ statusCode: 400, message: 'Status tidak valid' })
  }

  const db = getDb()

  // Get the donation
  const existingDonations = await db.select().from(donations).where(eq(donations.id, id)).limit(1)
  const donation = existingDonations[0]

  if (!donation) {
    throw createError({ statusCode: 404, message: 'Donasi tidak ditemukan' })
  }

  if (donation.status !== 'PENDING') {
    throw createError({ statusCode: 400, message: 'Donasi sudah diproses sebelumnya' })
  }

  // Update donation status
  await db.update(donations)
    .set({ 
      status,
      paidAt: status === 'PAID' ? new Date() : null
    })
    .where(eq(donations.id, id))

  // If PAID, update the campaign currentAmount
  if (status === 'PAID') {
    const existingCampaigns = await db.select().from(campaigns).where(eq(campaigns.id, donation.campaignId)).limit(1)
    const campaign = existingCampaigns[0]

    if (campaign) {
      const newAmount = Number(campaign.currentAmount) + Number(donation.amount)
      await db.update(campaigns)
        .set({ currentAmount: newAmount.toString() })
        .where(eq(campaigns.id, campaign.id))
    }
  }

  return { success: true, status }
})
