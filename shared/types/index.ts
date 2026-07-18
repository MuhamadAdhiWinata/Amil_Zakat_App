export type UserRole = 'super_admin' | 'admin' | 'user'
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
  image?: string
  targetAmount: number
  currentAmount: number
  status: CampaignStatus
  createdAt: string
}
