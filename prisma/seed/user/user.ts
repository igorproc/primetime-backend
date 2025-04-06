import { Prisma, PrismaClient, user_roles } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export default async function (prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
  const users = [
    {
      id: 369722545,
      firstName: 'Pr0s1k',
      role: user_roles.ADMIN,
      login: 'pr0s1k',
      photoUrl: 'https://t.me/i/userpic/320/-n2lCDE6m96YkJeujGcQSsWaKQfn6Y_J_5dLqCbQbuA.jpg',
    }
  ]

  for (const value of users) {
    await prismaClient
      .user
      .upsert({
        where: { id: value.id },
        update: {},
        create: value,
      })
  }
}
