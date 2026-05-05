export type UserRole = 'super_admin' | 'admin' | 'user'
export type DonationStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED'
export type CampaignStatus = 'active' | 'closed'

export interface User {
  id: string
  email: string
  name: string
  provider: string
  role: UserRole
  createdAt: string
}

export interface Campaign {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  status: CampaignStatus
  createdAt: string
}

export interface Donation {
  id: string
  userId?: string
  guestName?: string
  guestEmail?: string
  amount: number
  isAnonymous: boolean
  campaignId: string
  status: DonationStatus
  invoiceId?: string
  paymentReference?: string
  createdAt: string
  paidAt?: string
}
