// Node Deps
import { env } from 'process'
import { Module } from '@nestjs/common'
// Other Modules
import { DbModule } from '@/db/db.module'
import { JwtModule } from '@nestjs/jwt'
// Child Services
import { TelegramAuthService } from '@/auth/auth-ways/telegram/telegramAuth.service'
import { EmailAuthService } from '@/auth/auth-ways/email/email.service'
import { AuthProviderService } from '@/auth/providers/auth.provider'
// Current Module Deps
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AuthGuard } from '@/auth/guards/auth.guard'

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      secret: env.CLIENT_SECRET,
      signOptions: {},
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TelegramAuthService,
    EmailAuthService,
    AuthProviderService,
    AuthGuard,
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
