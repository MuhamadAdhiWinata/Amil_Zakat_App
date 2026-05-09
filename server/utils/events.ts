import { EventEmitter } from 'events'

class AppEventEmitter extends EventEmitter {}

export const appEvents = new AppEventEmitter()

// Event names as constants
export const EVENTS = {
  DONATION_CREATED: 'donation.created',
  PAYMENT_CREATED: 'payment.created',
  PAYMENT_PAID: 'payment.paid',
  PAYMENT_FAILED: 'payment.failed',
  WEBHOOK_RECEIVED: 'webhook.received',
} as const
