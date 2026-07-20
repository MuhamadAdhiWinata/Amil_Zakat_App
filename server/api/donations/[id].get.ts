import { getDb, schema } from '~~/server/db'
import { eq } from 'drizzle-orm'

const { donations, campaigns, payments } = schema

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'Invalid ID' })

  const db = getDb()
  const result = await db
    .select({
      id: donations.id,
      userId: donations.userId,
      campaignId: donations.campaignId,
      donaturName: donations.donaturName,
      donaturEmail: donations.donaturEmail,
      donaturPhone: donations.donaturPhone,
      amount: donations.amount,
      isAnonymous: donations.isAnonymous,
      status: donations.status,
      createdAt: donations.createdAt,
      completedAt: donations.completedAt,
      campaignTitle: campaigns.title,
      paymentId: payments.id,
      gatewayMethod: payments.gatewayMethod,
      gatewayOrderId: payments.gatewayOrderId,
      paymentStatus: payments.status,
      vaNumber: payments.vaNumber,
      qrString: payments.qrString,
      paidAt: payments.paidAt,
      paymentExpiredAt: payments.expiredAt,
    })
    .from(donations)
    .leftJoin(campaigns, eq(donations.campaignId, campaigns.id))
    .leftJoin(payments, eq(payments.donationId, donations.id))
    .where(eq(donations.id, id))
    .limit(1)

  if (!result[0]) throw createError({ statusCode: 404, message: 'Donation not found' })

  const d = result[0]
  return {
    ...d,
    amount: Number(d.amount),
  }
})
