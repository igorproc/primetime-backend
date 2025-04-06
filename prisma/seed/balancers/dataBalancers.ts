// Node Deps
import { Prisma, PrismaClient, balancer_code, balancer_status } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

export default async function (prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
  const balancers = [
    {
      code: balancer_code.KP,
      name: 'Kinopoisk Unofficial',
      docs: 'https://kinopoiskapiunofficial.tech/api',
      status: balancer_status.ONLINE,
      selected: true,
    },

    {
      code: balancer_code.KP_TG_KEY,
      name: 'Kinopoisk Unofficial Paid',
      docs: 'https://api.kinopoisk.dev/documentation',
      status: balancer_status.ONLINE,
      selected: false,
    }
  ]

  for (const value of balancers) {
    await prismaClient
      .dataBalancer
      .upsert({
        where: { code: value.code },
        update: {},
        create: value,
      })
  }
}
