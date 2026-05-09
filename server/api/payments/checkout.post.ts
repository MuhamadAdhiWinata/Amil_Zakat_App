import { paymentService } from '../../services/payment/payment.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.donationId || !body.method) {
    throw createError({
      statusCode: 400,
      statusMessage: 'donationId and method are required'
    })
  }

  try {
    const result = await paymentService.checkout(body.donationId, body.method)
    return {
      success: true,
      data: result
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})
