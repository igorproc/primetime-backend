import { Prisma, PrismaClient, device_platforms } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export default async function (prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
  const clientIds = [
    {
      clientId: 'c04b27c9-4b5f-4913-a2b2-a0d2206c6d21',
      platform: device_platforms.WINDOWS,
      ip: '::1',
      userId: 369722545,
    }
  ]

  for (const value of clientIds) {
    await prismaClient
      .device
      .upsert({
        where: { clientId: value.clientId },
        update: {},
        create: value,
      })
  }
}
