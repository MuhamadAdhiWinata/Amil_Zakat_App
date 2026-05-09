import { donationRepository } from '../../repositories/donation.repository'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'Invalid ID' })

  const donation = await donationRepository.findById(id)
  if (!donation) throw createError({ statusCode: 404, message: 'Donation not found' })

  return donation
})
