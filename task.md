# Task List — Amil Zakat App

## Sebelumnya (sudah selesai)

- [x] Buat `.env.example` (template env tanpa secrets)
- [x] Buat `AGENTS.md` (panduan agent lengkap)
- [x] **scripts/seed.ts** — perbaiki `guestName`→`donaturName`, status `PAID`→`COMPLETED`
- [x] **scripts/reset-db.ts** — tambah `DROP TABLE IF EXISTS payments`
- [x] **shared/types/index.ts** — hapus `Donation` & `DonationStatus` conflicting
- [x] **server/api/donations/[id]/confirm.post.ts** — fix status `PENDING`→`INITIATED`, `paidAt`→`completedAt`
- [x] **pages/admin/donations/index.vue** — `guestName`→`donaturName`, perbaiki `statusColor()`
- [x] **pages/admin/categories/index.vue** — `showToast`→`toast.success`, tambah `layout:admin`
- [x] **pages/admin/categories/create.vue** — `showToast`→`toast.success`, tambah `layout:admin`
- [x] **server/api/admin/categories/{post,put,delete}** — tambah auth check
- [x] **package.json** — tambah `dotenv` ke devDependencies
- [x] **server/api/donations/[id].get.ts** — convert `amount` ke Number
- [x] **server/api/payments/[id].get.ts** — convert `amount` ke Number
- [x] **server/api/admin/donations.get.ts** — convert `amount` ke Number
- [x] **pages/donasi/[id]/{success,instruksi,pembayaran}.vue** — ganti `ref<any>` → typed ref

## Task baru (sudah selesai)

### A. PWA — Active Configuration
- [x] **nuxt.config.ts** — tambah blok `pwa: { manifest: {...}, workbox: {...} }`
- [x] **components/ui/PwaInstallButton.vue** — komponen tombol install PWA (icon Download)
- [x] **components/ui/AppHeader.vue** — tambah `<UiPwaInstallButton />` di pojok kanan

### B. Rebranding — Nama & Logo
- [x] **components/ui/AppHeader.vue** — ganti logo "A" dengan `<img src="~/assets/images/image.png">`
- [x] **components/ui/AppHeader.vue** — ganti default title `'Amil Zakat'` → `'Baitulmall Bangun Rakyat Sejahtera'`
- [x] **pages/campaign/[id]/index.vue:23** — ganti "Yayasan Amil Zakat" → "Baitulmall Bangun Rakyat Sejahtera"
- [x] **AGENTS.md** — update nama app
