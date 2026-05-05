import { defineConfig } from 'drizzle-kit'
import { loadEnv } from 'vite'

const env = loadEnv('', process.cwd(), '')

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: env.DATABASE_URL || process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: false,
})
