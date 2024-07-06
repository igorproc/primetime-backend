// Node Deps
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import { env } from 'process'
// Types
import type { INestApplication } from '@nestjs/common'

export default function(app: INestApplication) {
  const VERSION = '1.0'

  const config = new DocumentBuilder()
    .setTitle('Primetime')
    .setDescription(`${env.APP_MODE} api V-${VERSION}`)
    .setVersion(VERSION)
    .addBearerAuth({
      type: 'http',
      in: 'head',
    })
    .build()

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: `PrimeTime API v${VERSION}`,
    swaggerOptions: {
      withCredentials: true,
    }
  }

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, customOptions)
}
