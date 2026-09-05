import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client.js'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
})
const db = new PrismaClient({ adapter })

async function main() {
  // Clear existing data in dependency order
  await db.booking.deleteMany()
  await db.token.deleteMany()
  await db.table.deleteMany()
  await db.user.deleteMany()

  // Users
  const [admin] = await Promise.all([
    db.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        passwordHash: await bcrypt.hash('admin', 10),
        role: 'ADMIN',
      },
    }),
    db.user.create({
      data: {
        name: 'Teszt Felhasználó',
        email: 'user@example.com',
        passwordHash: await bcrypt.hash('password', 10),
        role: 'USER',
      },
    }),
  ])

  // Tables (matching mock data)
  await db.table.createMany({
    data: [
      { name: 'Biliárd 1',  type: 'SNOOKER',   category: 'COMPETITION', color: 'GREEN',  status: 9, x: 50,  y: 50,  isLocked: false },
      { name: 'Csocsó 1',   type: 'FOOSBALL',  category: 'NORMAL',      color: 'BLUE',   status: 7, x: 300, y: 60,  isLocked: false },
      { name: 'Léghoki 1',  type: 'AIR_HOCKEY', category: 'NORMAL',     color: 'RED',    status: 6, x: 520, y: 160, isLocked: false },
      { name: 'Csocsó 2',   type: 'FOOSBALL',  category: 'KIDS',        color: 'YELLOW', status: 5, x: 100, y: 270, isLocked: true  },
    ],
  })

  console.log('✅ Seed complete')
  console.log(`   Admin: admin@example.com / admin`)
  console.log(`   User:  user@example.com / password`)
  console.log(`   Tables: 4 seeded`)
  void admin
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
