// Constants
import { COOKIE_MAX_AGE } from '@/const/app'
// Types
import type { INestApplication } from '@nestjs/common'

export default function (app: INestApplication) {
  app.enableCors({
    credentials: true,
    origin: true,
    maxAge: COOKIE_MAX_AGE
  })
}
