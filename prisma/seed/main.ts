// Node Deps
import { PrismaClient } from '@prisma/client'
// Seeds
import User from './user/user'
import ClientId from './user/clientId'
import TaskCodes from './migrations/taskCodes'
import DataBalancers from './balancers/dataBalancers'

const prisma = new PrismaClient()

async function main() {
  try {
    const userSeed = async () => {
      await ClientId(prisma)
      await User(prisma)
    }

    await Promise.all([
      userSeed,
      TaskCodes(prisma),
      DataBalancers(prisma),
    ])
  } catch (error) {
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
  })
