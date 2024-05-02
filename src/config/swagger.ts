// Node Deps
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { env } from 'process'
// Types
import type { INestApplication } from '@nestjs/common'

export default function(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Primetime')
    .setDescription(`${env.APP_MODE} api`)
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
}
