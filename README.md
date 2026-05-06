# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Database Utility Scripts

Kami menyediakan beberapa skrip bantuan untuk mengelola database di lingkungan pengembangan:

### 1. Reset Database
Menghapus seluruh tabel dan data di dalam database. Gunakan ini jika Anda ingin membersihkan database dari nol.
```bash
npm run db:reset
```

### 2. Seeding Data
Mengisi database dengan data awal (Admin, Kategori, Campaign, dan Donasi contoh) agar Anda bisa langsung melakukan pengetesan.
**Penting:** Jalankan ini setelah melakukan `db:push` atau `db:reset`.
```bash
npm run db:seed
```

### 3. Reset & Seed Total
Jika Anda ingin melakukan pembersihan total dan langsung mengisi data contoh:
```bash
npm run db:reset && npm run db:push && npm run db:seed
```

### 4. Drizzle Studio
Membuka antarmuka visual untuk melihat dan mengedit data database secara langsung di browser.
```bash
npm run db:studio
```

## E2E Testing
Menjalankan suite pengujian otomatis menggunakan Playwright.
```bash
npm run test:e2e
```