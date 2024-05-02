// Node Deps
import { ValidationPipe, type INestApplication } from '@nestjs/common'
import { env } from 'process'
import cookieParser from 'cookie-parser'
// Config
import Cors from '@/config/cors'
import Swagger from '@/config/swagger'
// Constants
import { COOKIE_MAX_AGE } from '@/const/app'

export default function (app: INestApplication) {
  const isProd = env.APP_MODE === 'production'
  app.setGlobalPrefix('api')
  app.use(
    cookieParser()
  )
  app.enableCors({
    credentials: true,
    origin: true,
    maxAge: COOKIE_MAX_AGE
  })

  Cors(app)
  Swagger(app)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: isProd,
    })
  )
}