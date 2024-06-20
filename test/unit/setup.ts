import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

const prisma = new PrismaClient()
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

jest.mock('../../src/db/db.service', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

// beforeEach(() => {
//   mockReset(prismaMock)
// })
