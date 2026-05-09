Saya memiliki aplikasi Amil Zakat berbasis Nuxt 3 fullstack dengan architecture modular, event-driven, dan repository pattern.

Saat ini:
- OAuth Google sudah terimplementasi
- Flow create donation/transaksi dasar sudah berjalan
- Yang belum selesai adalah integrasi payment gateway Pakasir
- Saya ingin memperbaiki arsitektur transaksi sebelum implementasi payment selesai agar tidak menjadi technical debt

Tugas:
1. Review struktur transaksi/payment existing
2. Refactor architecture payment agar scalable dan audit-friendly
3. Update spec.md agar sesuai dengan architecture baru
4. Implementasikan payment flow Pakasir dengan clean architecture
5. Jangan merusak flow existing yang sudah berjalan

==================================================
CONTEXT
==================================================

Saat ini spec.md masih menggunakan struktur:

donations:
- amount
- status
- invoice_id
- payment_reference

Masalah:
- donation dan payment masih tercampur
- belum scalable untuk retry payment
- sulit handle expired payment
- sulit handle multiple payment attempts
- sulit migrate gateway di masa depan

Saya ingin memisahkan domain:
- donation = business intent
- payment = settlement transaction

==================================================
REVISI ARCHITECTURE YANG DIINGINKAN
==================================================

Pisahkan entity:

1. donations
2. payments
3. payment_logs

==================================================
TARGET DATABASE DESIGN
==================================================

donations:
- id
- user_id nullable
- campaign_id
- donor_name
- donor_email
- donor_phone
- amount
- is_anonymous
- status
- created_at
- completed_at

Donation status:
- INITIATED
- WAITING_PAYMENT
- COMPLETED
- CANCELLED

==================================================

payments:
- id
- donation_id
- gateway
- gateway_method
- gateway_order_id
- gateway_reference
- amount
- status
- qr_string
- va_number
- expired_at
- paid_at
- raw_response
- created_at
- updated_at

Payment status:
- PENDING
- PAID
- FAILED
- EXPIRED

==================================================

payment_logs:
- id
- payment_id
- type
- direction
- payload
- created_at

type examples:
- WEBHOOK
- API_REQUEST
- API_RESPONSE
- STATUS_CHECK

direction examples:
- IN
- OUT

==================================================
PAYMENT FLOW YANG DIINGINKAN
==================================================

1. User memilih nominal
2. Create donation
3. donation.status = INITIATED

4. User memilih payment method
5. Create payment
6. payment.status = PENDING
7. donation.status = WAITING_PAYMENT

8. Call Pakasir API
9. Tampilkan QRIS / VA

10. Pakasir webhook masuk
11. JANGAN percaya webhook langsung
12. WAJIB call transactiondetail API Pakasir

13. Jika valid:
- payment.status = PAID
- donation.status = COMPLETED
- set paid_at

==================================================
CRITICAL REQUIREMENTS
==================================================

- Webhook harus idempotent
- Jangan pernah update payment langsung dari webhook tanpa verifikasi transactiondetail API
- Payment PAID tidak boleh berubah status lagi
- Semua API key wajib server-side
- Gunakan clean architecture
- Jangan campur business logic di route handler
- Gunakan event-driven approach
- Pisahkan:
  - route handler
  - service
  - repository
  - event
  - validation

==================================================
EVENTS YANG DIINGINKAN
==================================================

Implementasikan event seperti:

- donation.created
- payment.created
- payment.paid
- payment.expired
- webhook.received

Pisahkan handler masing-masing.

==================================================
FOLDER STRUCTURE
==================================================

Gunakan struktur modular seperti:

/server
  /api
  /services
    /payment
  /repositories
  /events
  /validators

==================================================
PAYMENT METHODS
==================================================

Support:
- qris
- bri_va
- bni_va
- cimb_niaga_va
- permata_va
- maybank_va

Gunakan internal mapping agar frontend tidak tergantung nama API Pakasir.

==================================================
UPDATE SPEC.MD
==================================================

WAJIB update spec.md agar:
- schema baru tercermin
- payment architecture baru terdokumentasi
- event-driven payment flow dijelaskan
- webhook validation dijelaskan secara eksplisit
- transaction lifecycle dijelaskan
- separation donation vs payment dijelaskan
- state transition dijelaskan
- security section diperjelas
- payment retry & expiry handling ditambahkan

Jangan hanya implementasi code.
Spec.md HARUS direvisi agar menjadi source of truth architecture terbaru.

==================================================
DELIVERABLE YANG DIINGINKAN
==================================================

1. Revisi spec.md lengkap
2. Revisi schema database
3. Payment architecture baru
4. Implementasi Pakasir integration
5. Webhook handler aman
6. Transaction validation service
7. Event-driven payment flow
8. State transition rules
9. Idempotent webhook handling
10. Logging & audit-ready structure
11. Clean modular implementation
12. Migration/refactor plan dari structure lama ke baru

==================================================
IMPORTANT
==================================================

- Jangan rewrite total app
- Fokus incremental refactor
- Existing auth flow harus tetap jalan
- Existing donation flow jangan dirusak
- Fokus scalability, auditability, dan maintainability
- Production-ready implementation only