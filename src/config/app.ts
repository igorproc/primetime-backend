// Node Deps
import { type INestApplication, ValidationPipe, VersioningType } from '@nestjs/common'
import { env } from 'process'
import * as cookieParser from 'cookie-parser'
// Config
import Cors from '@/config/cors'
import Swagger from '@/config/swagger'

export default function (app: INestApplication) {
  const isProd = env.APP_MODE === 'production'
  app.setGlobalPrefix('api')
  app.use(
    cookieParser()
  )
  Cors(app)
  Swagger(app)

  app.enableVersioning({
    type: VersioningType.URI,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: isProd,
    })
  )
}