import { paymentService } from '../../services/payment/payment.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    await paymentService.handleWebhook(body)
    return { success: true }
  } catch (error: any) {
    console.error('[Webhook Error]', error.message)
    // Always return 200 to gateway unless it's a critical system error 
    // to prevent gateway from retrying infinitely on business logic errors
    return { success: false, message: error.message }
  }
})
