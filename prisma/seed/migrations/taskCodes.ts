// Node Deps
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export default async function (prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
  const codes = [
    {
      title: 'MovieMigration',
      description: 'Start Movie Migration From Old Version',
      code: 'MOVIE',
    },
  ]

  for (const value of codes) {
    await prismaClient
      .avliableMigrationTasks
      .upsert({
        where: { code: value.code },
        update: {},
        create: value,
      })
  }
}
