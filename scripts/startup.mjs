import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required')
  process.exit(1)
}

async function main() {
  const connection = await mysql.createConnection(DATABASE_URL)

  try {
    console.log('Checking database schema...')

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id varchar(36) NOT NULL,
        email varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        password varchar(255),
        provider varchar(50) NOT NULL DEFAULT 'google',
        role varchar(50) NOT NULL DEFAULT 'user',
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY (email)
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id varchar(36) NOT NULL,
        name varchar(100) NOT NULL,
        slug varchar(100) NOT NULL,
        icon varchar(50),
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY (name),
        UNIQUE KEY (slug)
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id varchar(36) NOT NULL,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        image varchar(255),
        target_amount decimal(15,2) NOT NULL,
        current_amount decimal(15,2) NOT NULL DEFAULT '0',
        category_id varchar(36),
        status varchar(50) NOT NULL DEFAULT 'active',
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS donations (
        id varchar(36) NOT NULL,
        user_id varchar(36),
        campaign_id varchar(36) NOT NULL,
        donatur_name varchar(255),
        donatur_email varchar(255),
        donatur_phone varchar(20),
        amount decimal(15,2) NOT NULL,
        is_anonymous boolean NOT NULL DEFAULT false,
        status varchar(50) NOT NULL DEFAULT 'INITIATED',
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        completed_at timestamp NULL,
        PRIMARY KEY (id)
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id varchar(36) NOT NULL,
        donation_id varchar(36) NOT NULL,
        gateway varchar(50) NOT NULL DEFAULT 'PAKASIR',
        gateway_method varchar(50),
        gateway_order_id varchar(100),
        gateway_reference varchar(255),
        amount decimal(15,2) NOT NULL,
        status varchar(50) NOT NULL DEFAULT 'PENDING',
        qr_string text,
        va_number varchar(50),
        expired_at timestamp NULL,
        paid_at timestamp NULL,
        raw_response json,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY (gateway_order_id)
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payment_logs (
        id varchar(36) NOT NULL,
        payment_id varchar(36),
        type varchar(50) NOT NULL,
        direction varchar(10) NOT NULL,
        payload json NOT NULL,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      )
    `)

    console.log('Database schema is up to date.')

    const [rows] = await connection.execute('SELECT COUNT(*) as cnt FROM categories')
    if (rows[0].cnt === 0) {
      console.log('Seeding database...')
      await runSeed(connection)
      console.log('Database seeded successfully.')
    } else {
      console.log('Database already contains data, skipping seed.')
    }
  } finally {
    await connection.end()
  }
}

async function runSeed(connection) {
  const cats = [
    { name: 'Mendesak', slug: 'mendesak', icon: 'Flame' },
    { name: 'Bencana Alam', slug: 'bencana', icon: 'Landmark' },
    { name: 'Pendidikan', slug: 'pendidikan', icon: 'GraduationCap' },
    { name: 'Kesehatan', slug: 'kesehatan', icon: 'Stethoscope' },
    { name: 'Zakat', slug: 'zakat', icon: 'Wallet' },
  ]
  const catIds = []
  for (const c of cats) {
    const id = randomUUID()
    await connection.execute(
      'INSERT INTO categories (id, name, slug, icon) VALUES (?, ?, ?, ?)',
      [id, c.name, c.slug, c.icon]
    )
    catIds.push(id)
  }

  const adminId = randomUUID()
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await connection.execute(
    'INSERT INTO users (id, email, name, password, provider, role) VALUES (?, ?, ?, ?, ?, ?)',
    [adminId, 'admin@amilzakat.com', 'Super Admin', hashedPassword, 'credentials', 'super_admin']
  )

  const campaigns = [
    {
      title: 'Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh',
      description: 'Panti Asuhan Harapan Baru saat ini menampung 45 anak yatim dan piatu. Namun, kondisi bangunan panti sangat memprihatinkan. Atap bocor di mana-mana saat hujan, dan tembok mulai retak membahayakan anak-anak. Mari bersama-sama bantu renovasi Panti Asuhan ini agar anak-anak bisa tidur dan belajar dengan aman dan nyaman.',
      image: 'https://asset.kompas.com/crops/xeamtai9jP2M_k5l0nrrejllosA=/0x0:0x0/1200x800/data/photo/2025/12/22/69490c2ade111.jpg',
      targetAmount: '50000000',
      currentAmount: '15500000',
      catIdx: 0,
    },
    {
      title: 'Sedekah Air Bersih untuk Warga Desa Kekeringan',
      description: 'Krisis air bersih melanda desa-desa di pelosok. Warga harus berjalan berkilo-kilometer untuk mendapatkan air yang layak. Mari bantu bangun sumur bor dan instalasi air bersih untuk mereka.',
      image: 'https://indomgb.s3.amazonaws.com/wp-content/uploads/2021/04/22035539/1-air-bersih-ntt.jpg',
      targetAmount: '10000000',
      currentAmount: '3200000',
      catIdx: 1,
    },
    {
      title: 'Beasiswa Pendidikan Anak Yatim Berprestasi',
      description: 'Banyak anak yatim yang memiliki prestasi gemilang namun terancam putus sekolah karena kendala biaya. Mari jadi kakak asuh dan bantu biaya pendidikan mereka.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      targetAmount: '5000000',
      currentAmount: '4800000',
      catIdx: 2,
    },
  ]
  const campaignIds = []
  for (const c of campaigns) {
    const id = randomUUID()
    await connection.execute(
      'INSERT INTO campaigns (id, title, description, image, target_amount, current_amount, status, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, c.title, c.description, c.image, c.targetAmount, c.currentAmount, 'active', catIds[c.catIdx]]
    )
    campaignIds.push(id)
  }

  const donations = [
    { campaignId: 0, amount: '50000', status: 'COMPLETED', donaturName: 'Budi Santoso', donaturEmail: 'budi@example.com', isAnonymous: false, completedAt: new Date() },
    { campaignId: 0, amount: '100000', status: 'WAITING_PAYMENT', donaturName: 'Siti Aminah', donaturEmail: 'siti@example.com', isAnonymous: false },
    { campaignId: 1, amount: '200000', status: 'COMPLETED', donaturName: 'Hamba Allah', isAnonymous: true, completedAt: new Date() },
    { campaignId: 2, amount: '25000', status: 'INITIATED', donaturName: 'Agus', isAnonymous: false },
  ]
  for (const d of donations) {
    const id = randomUUID()
    await connection.execute(
      'INSERT INTO donations (id, campaign_id, donatur_name, donatur_email, amount, is_anonymous, status, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, campaignIds[d.campaignId], d.donaturName, d.donaturEmail || null, d.amount, d.isAnonymous, d.status, d.completedAt || null]
    )
  }
}

main().catch((err) => {
  console.error('Startup failed:', err)
  process.exit(1)
})
