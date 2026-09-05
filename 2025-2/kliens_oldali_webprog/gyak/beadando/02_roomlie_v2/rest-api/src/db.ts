import 'dotenv/config'
import { PrismaClient } from '../prisma/generated/prisma/client.js'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
})

export const db = new PrismaClient({ adapter })
