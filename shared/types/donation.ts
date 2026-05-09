export type DonationStatus = 'INITIATED' | 'WAITING_PAYMENT' | 'COMPLETED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED';

export interface Donation {
  id: string;
  userId?: string;
  campaignId: string;
  donaturName?: string;
  donaturEmail?: string;
  donaturPhone?: string;
  amount: number;
  isAnonymous: boolean;
  status: DonationStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface Payment {
  id: string;
  donationId: string;
  gateway: string;
  gatewayMethod?: string;
  gatewayOrderId?: string;
  gatewayReference?: string;
  amount: number;
  status: PaymentStatus;
  qrString?: string;
  vaNumber?: string;
  expiredAt?: Date;
  paidAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export type PaymentMethod = 
  | 'qris'
  | 'bri'
  | 'bni'
  | 'cimb'
  | 'permata'
  | 'maybank';
