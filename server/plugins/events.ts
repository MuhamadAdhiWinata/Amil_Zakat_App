import { registerPaymentHandlers } from '../events/payment.handlers'

export default defineNitroPlugin((nitroApp) => {
  console.log('[Nitro Plugin] Registering app event handlers...')
  registerPaymentHandlers()
})
