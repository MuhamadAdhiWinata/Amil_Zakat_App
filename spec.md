# Amil Zakat Web App — Technical Specification (spec.md)

## 1. Overview

Web aplikasi Amil Zakat berbasis Nuxt 3 (fullstack) dengan fitur:

* Donasi zakat/infaq/sedekah
* Login Google (opsional)
* Donasi tanpa akun (guest + anonymous)
* Integrasi payment gateway (Pakasir)
* PWA (installable, mobile-first UX)

Target: MVP cepat, stabil, dan bisa dipakai lembaga.

---

## 2. Tech Stack

### Frontend + Backend

* Nuxt 3 (SSR + Nitro server)

### Database

* MariaDB (external service, terpisah dari container app)

### ORM

* drizzel

### Auth

* OAuth Google

### Payment Gateway

* Pakasir

### PWA

* @vite-pwa/nuxt

---

## 3. Core Features

### 3.1 Donatur

* Lihat campaign
* Input nominal donasi
* Pilih:

  * Login Google
  * Guest donation
* Checkbox: anonim
* Checkout pembayaran
* Riwayat donasi (untuk user login)

---

### 3.2 Admin

* CRUD campaign
* Lihat transaksi
* Update status distribusi
* Export laporan

---

### 3.3 Transparansi

* Progress dana campaign
* List donatur:

  * tampil nama / “Anonim”

---

## 4. Authentication

### 4.1 Login Google

Flow:

1. User klik login
2. Redirect ke Google OAuth
3. Callback ke backend
4. Simpan / create user
5. Generate session (cookie)

### 4.2 Guest Donation

* Tidak perlu login
* Tetap input:

  * nama
  * email / no HP

### 4.3 Anonymous Mode

* Field: `is_anonymous = true`
* UI publik → tampil “Anonim”

### 4.4 RBAC (Role-Based Access Control)

#### Roles

* `super_admin`
* `admin`
* `user`

#### Rules

* `super_admin`:

  * Full access
  * Manage admin
  * Akses semua data
* `admin`:

  * CRUD campaign
  * Lihat transaksi
  * Update distribusi
* `user`:

  * Donasi & riwayat

#### Enforcement

* Wajib di server (Nitro API)

#### Storage

* Field `role` di tabel users

---

## 5. Database Schema (Simplified)

### users

```
id
email
name
provider (google)
role (user, admin, super_admin)
created_at
```

### campaigns

```
id
title
description
target_amount
current_amount
status
created_at
```

### donations

```
id
user_id (nullable)
guest_name
guest_email
amount
is_anonymous
campaign_id
status (PENDING, PAID, FAILED, EXPIRED)
invoice_id
payment_reference
created_at
paid_at
```

### payment_logs

```
id
donation_id
payload (json)
created_at
```

---

## 6. Payment Integration (Pakasir)

### Flow

1. Create donation
2. Generate invoice_id
3. Call API
4. User bayar
5. Webhook
6. Update status

---

## 7. Application Flow

1. User buka campaign
2. Input nominal
3. Login / guest
4. Create donation
5. Redirect payment
6. Webhook update

---

## 8. PWA

* Installable
* Standalone
* Basic caching

---

## 9. UI/UX

### 9.1 Styling System

* Menggunakan Tailwind CSS
* DILARANG hardcode warna langsung di komponen
* Semua warna harus menggunakan design token (global CSS variables)

Contoh (WAJIB):

```
text-primary
bg-primary
border-secondary
text-danger
```

---

### 9.2 Global Theme (style.css)

Semua warna didefinisikan di global stylesheet agar bisa diubah tanpa menyentuh komponen.

Contoh:

```
:root {
  --color-primary: #0f766e;
  --color-secondary: #64748b;
  --color-danger: #dc2626;
  --color-success: #16a34a;
  --color-warning: #f59e0b;
}
```

Mapping ke Tailwind:

* extend theme → gunakan CSS variable

Tujuan:

* mudah ganti branding
* konsistensi UI
* tidak ada warna liar

---

### 9.3 Component Rules

* Semua button, alert, badge pakai variant:

  * primary
  * secondary
  * danger
  * success

* Tidak boleh inline style warna

---

### 9.4 Alert & Modal

DILARANG menggunakan:

* alert()
* confirm()

WAJIB menggunakan custom component:

#### Alert

* Toast / inline alert
* Support variant (success, error, warning)

#### Modal

* Confirm dialog custom
* Bisa reusable
* Support:

  * title
  * description
  * confirm action
  * cancel action

---

### 9.5 Mobile-first

* Layout utama mobile
* Scroll vertikal
* CTA jelas

### 9.6 Desktop

* Centered layout
* Max width 420px

---

### 9.7 Layout Structure

* App container (center)
* Bottom navigation (fixed)
* Content padding bawah

---

### 9.8 Bottom Navigation

Menu:

* Home
* Donasi
* Riwayat
* Akun

---

### 9.9 Safe Area

* Support notch (iOS)

---

### 9.10 UI Library / Template

* Boleh menggunakan UI framework / template
* HARUS konfirmasi terlebih dahulu sebelum digunakan
* Tetap mengikuti aturan:

  * warna global
  * tidak hardcode
  * konsisten dengan design system

---

## 10. Architecture & Best Practices

### 10.1 Event-Driven Approach

* Hindari logic berbasis fungsi statis yang saling terikat
* Gunakan pendekatan event-driven untuk meningkatkan scalability

Contoh:

* Payment success → trigger event
* Donation created → trigger event
* Webhook received → trigger event

Implementasi:

* Gunakan event emitter sederhana di backend
* Pisahkan handler per event (tidak dalam satu file besar)

Tujuan:

* menghindari spaghetti code
* mudah extend fitur (notif, logging, dll)

---

### 10.2 Component Reusability

Semua komponen UI HARUS reusable.

Contoh komponen:

* Card
* Button
* Input
* Modal
* Alert

Rules:

* Gunakan props untuk variasi
* Jangan duplicate layout
* Pisahkan logic & presentational component

---

### 10.3 Folder Structure (Recommended)

```
/components
  /ui
    Button.vue
    Card.vue
    Modal.vue
    Alert.vue
  /features
    donation
    campaign

/server
  /api
  /services
  /events
  /repositories
```

---

### 10.4 Separation of Concerns

Pisahkan layer:

* API handler → handle request/response
* Service → business logic
* Repository → database access
* Event → side effects

Jangan campur semua dalam satu file.

---

### 10.5 Code Quality

* WAJIB menggunakan TypeScript
* Gunakan linting (ESLint)
* Gunakan formatting (Prettier)
* Hindari magic value
* Gunakan constant

---

### 10.6 Shared Types (Frontend & Backend)

Untuk menjaga konsistensi data, gunakan shared types antara frontend dan backend.

#### Structure

```
/shared
  types/
    user.ts
    donation.ts
    campaign.ts
```

#### Rules

* Semua type utama didefinisikan di folder `shared`
* Digunakan oleh:

  * frontend (component, composable)
  * backend (API, service)
* Tidak boleh duplicate type di tempat lain

#### Example

```
export interface Donation {
  id: string
  amount: number
  status: 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED'
}
```

#### Benefits

* Konsistensi schema
* Mengurangi bug mismatch data
* Lebih scalable

---

### 10.7 Scalability Mindset

* Semua fitur harus bisa di-extend tanpa rewrite besar

* Hindari tightly coupled code

* Gunakan pattern modular

* Semua fitur harus bisa di-extend tanpa rewrite besar

* Hindari tightly coupled code

* Gunakan pattern modular

---

## 11. Docker (App Only, DB External) (App Only, DB External)

Tujuan: container hanya untuk aplikasi (Nuxt). Database MariaDB berjalan sebagai service terpisah (managed / server lain / container lain di luar compose ini).

### 10.1 Service

* app (Nuxt)

---

### 10.2 Dockerfile

```
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

---

### 10.3 docker-compose.yml

```
version: '3.9'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: always
```

---

### 10.4 Database Connection

Aplikasi connect ke MariaDB external via connection string.

Contoh `.env`:

```
DATABASE_URL=mysql://root:rootpassword@localhost:3306/amil_zakat_db
```

Catatan:

* `host` bisa IP server DB atau hostname internal (kalau satu network)
* Pastikan whitelist IP container

---

### 10.5 Commands

```
docker-compose up --build
```

---

## 11. Security

* HTTP-only cookies
* Validate webhook
* Logging
* Backup DB

---

## 12. Edge Cases

* Webhook delay
* Double payment
* Guest vs user mismatch

---

## 13. Deployment

* VPS / Cloud
* HTTPS wajib
* DB terpisah (MariaDB)

---

## 14. Priority

1. Setup
2. Auth
3. Campaign
4. Donation
5. Payment
6. Webhook
7. UI
8. PWA

---

## 15. Success Criteria

* Donasi jalan
* Payment aman
* UI mobile OK

---

## 16. Notes

* Fokus stabilitas
* Audit-friendly

---
