import { getDb, schema } from '../server/db'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

async function seed() {
  const db = getDb()
  console.log('Resetting and seeding database...')

  // Clean up existing data
  const { campaigns, users, donations, categories } = schema
  
  await db.delete(donations)
  await db.delete(campaigns)
  await db.delete(categories)
  await db.delete(users)

  console.log('Database cleared.')

  // Seed Categories
  const categoryData = [
    { id: crypto.randomUUID(), name: 'Mendesak', slug: 'mendesak', icon: 'Flame' },
    { id: crypto.randomUUID(), name: 'Bencana Alam', slug: 'bencana', icon: 'Landmark' },
    { id: crypto.randomUUID(), name: 'Pendidikan', slug: 'pendidikan', icon: 'GraduationCap' },
    { id: crypto.randomUUID(), name: 'Kesehatan', slug: 'kesehatan', icon: 'Stethoscope' },
    { id: crypto.randomUUID(), name: 'Zakat', slug: 'zakat', icon: 'Wallet' },
  ]

  for (const cat of categoryData) {
    await db.insert(categories).values(cat)
  }
  console.log('Categories seeded.')

  // Seed Admin User
  const adminId = crypto.randomUUID()
  const hashedAdminPassword = await bcrypt.hash('admin123', 10)
  
  await db.insert(users).values({
    id: adminId,
    email: 'admin@amilzakat.com',
    name: 'Super Admin',
    password: hashedAdminPassword,
    provider: 'credentials',
    role: 'super_admin'
  })

  // Seed Campaigns
  const campaignData = [
    {
      id: crypto.randomUUID(),
      title: 'Bantu Renovasi Panti Asuhan Harapan Baru yang Hampir Rubuh',
      description: 'Panti Asuhan Harapan Baru saat ini menampung 45 anak yatim dan piatu. Namun, kondisi bangunan panti sangat memprihatinkan. Atap bocor di mana-mana saat hujan, dan tembok mulai retak membahayakan anak-anak. Mari bersama-sama bantu renovasi Panti Asuhan ini agar anak-anak bisa tidur dan belajar dengan aman dan nyaman.',
      image: 'https://images.unsplash.com/photo-1593113563332-e147ce827361?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      targetAmount: '50000000',
      currentAmount: '15500000',
      status: 'active',
      categoryId: categoryData[0].id // Mendesak
    },
    {
      id: crypto.randomUUID(),
      title: 'Sedekah Air Bersih untuk Warga Desa Kekeringan',
      description: 'Krisis air bersih melanda desa-desa di pelosok. Warga harus berjalan berkilo-kilometer untuk mendapatkan air yang layak. Mari bantu bangun sumur bor dan instalasi air bersih untuk mereka.',
      image: 'https://images.unsplash.com/photo-1541888078952-475267bfadcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      targetAmount: '10000000',
      currentAmount: '3200000',
      status: 'active',
      categoryId: categoryData[1].id // Bencana
    },
    {
      id: crypto.randomUUID(),
      title: 'Beasiswa Pendidikan Anak Yatim Berprestasi',
      description: 'Banyak anak yatim yang memiliki prestasi gemilang namun terancam putus sekolah karena kendala biaya. Mari jadi kakak asuh dan bantu biaya pendidikan mereka.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      targetAmount: '5000000',
      currentAmount: '4800000',
      status: 'active',
      categoryId: categoryData[2].id // Pendidikan
    }
  ]

  for (const c of campaignData) {
    await db.insert(campaigns).values(c)
  }

  // Seed Donations
  const dummyDonations = [
    {
      id: crypto.randomUUID(),
      campaignId: campaignData[0].id,
      amount: '50000',
      status: 'PAID',
      guestName: 'Budi Santoso',
      guestEmail: 'budi@example.com',
      isAnonymous: false,
    },
    {
      id: crypto.randomUUID(),
      campaignId: campaignData[0].id,
      amount: '100000',
      status: 'PENDING',
      guestName: 'Siti Aminah',
      guestEmail: 'siti@example.com',
      isAnonymous: false,
    },
    {
      id: crypto.randomUUID(),
      campaignId: campaignData[1].id,
      amount: '200000',
      status: 'PAID',
      guestName: 'Hamba Allah',
      guestEmail: null,
      isAnonymous: true,
    },
    {
      id: crypto.randomUUID(),
      campaignId: campaignData[2].id,
      amount: '25000',
      status: 'FAILED',
      guestName: 'Agus',
      guestEmail: null,
      isAnonymous: false,
    }
  ]

  for (const d of dummyDonations) {
    await db.insert(donations).values(d)
  }

  console.log('Seeding completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
