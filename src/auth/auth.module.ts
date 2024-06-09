// Node Deps
import { env } from 'process'
import { Module } from '@nestjs/common'
// Other Modules
import { DbModule } from '@/db/db.module'
import { JwtModule } from '@nestjs/jwt'
import { DeviceModule } from '@/device/device.module'
import { UserModule } from '@/user/user.module'
// Child Modules
import { TelegramModule } from '@/auth/telegram/telegram.module'
// Current Module Deps
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    DbModule,
    DeviceModule,
    UserModule,
    JwtModule.register({
      secret: env.CLIENT_SECRET,
      signOptions: {},
    }),
    TelegramModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
