// Node Deps
import { NestFactory } from '@nestjs/core'
import { env } from 'process'
// Configs
import AppConfig from '@/config/app'
// Module Deps
import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    { cors: true }
  )
  AppConfig(app)

  await app
    .listen(env.APP_PORT)
}

bootstrap()
