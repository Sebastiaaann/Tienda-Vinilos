import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// For Prisma 7, pass the adapter directly to the constructor
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: undefined, // Adapter-less for SQLite
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
