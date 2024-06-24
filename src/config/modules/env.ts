// Node Deps
import { ConfigModule } from '@nestjs/config'

export default function () {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  })
}
