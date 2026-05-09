export interface PakasirCreateResponse {
  payment: {
    project: string
    order_id: string
    amount: number
    fee: number
    total_payment: number
    payment_method: string
    payment_number: string 
    expired_at: string
  }
}

export interface PakasirDetailResponse {
  transaction: {
    amount: number
    order_id: string
    project: string
    status: 'completed' | 'unpaid' | 'expired' | 'cancelled'
    payment_method: string
    completed_at: string
  }
}

export class PakasirService {
  private apiKey: string
  private baseUrl: string
  private merchantSlug: string

  constructor() {
    this.apiKey = process.env.PAKASIR_API_KEY || ''
    this.baseUrl = process.env.PAKASIR_BASE_URL || 'https://app.pakasir.com/api'
    this.merchantSlug = process.env.PAKASIR_MERCHANT_SLUG || 'amil-zakat'
  }

  async createTransaction(params: {
    orderId: string
    amount: number
    method: string
  }) {
    // Pakasir ONLY accepts these 4 fields and amount MUST be integer
    const payload = {
      project: this.merchantSlug,
      order_id: params.orderId,
      amount: Math.round(params.amount), // Ensure integer
      api_key: this.apiKey
    }

    try {
      console.log('[Pakasir] Sending payload:', JSON.stringify(payload))
      const response = await $fetch<PakasirCreateResponse>(`${this.baseUrl}/transactioncreate/${params.method}`, {
        method: 'POST',
        body: payload,
        timeout: 10000
      })
      return response
    } catch (error: any) {
      const errorData = error.data
      console.error('[Pakasir] Create failed. Status:', error.statusCode, 'Data:', errorData)
      const message = errorData?.message || error.message
      throw new Error(`Gagal membuat transaksi di Pakasir: ${message}`)
    }
  }

  async getTransactionDetail(orderId: string, amount: number) {
    try {
      const response = await $fetch<PakasirDetailResponse>(`${this.baseUrl}/transactiondetail`, {
        method: 'GET',
        query: {
          project: this.merchantSlug,
          amount: Math.round(amount),
          order_id: orderId,
          api_key: this.apiKey
        }
      })
      return response
    } catch (error: any) {
      console.error('[Pakasir] Detail failed:', error.message)
      throw new Error(`Gagal mengecek status di Pakasir: ${error.message}`)
    }
  }
}

export const pakasirService = new PakasirService()
