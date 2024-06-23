// Node Deps
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import { env } from 'process'
// Types
import type { INestApplication } from '@nestjs/common'
import { tr } from '@faker-js/faker'

interface IRequestInterceptor {
  credentials: string,
}

export default function(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Primetime')
    .setDescription(`${env.APP_MODE} api`)
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'cookie',
    })
    .build()

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    }
  }

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, customOptions)
}
