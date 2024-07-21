// Node Deps
import { BullModule } from '@nestjs/bull'
import { env } from 'process'

export default function () {
  return BullModule.forRoot({
    redis: {
      keyPrefix: 'primetime',
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
      password: env.REDIS_PASSWORD,
      offlineQueue: true,
    },
    defaultJobOptions: {
      removeOnComplete: 1000,
      removeOnFail: 5000,
      attempts: 3,
    },
  })
}
