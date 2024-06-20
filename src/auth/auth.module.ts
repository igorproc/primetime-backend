// Node Deps
import { env } from 'process'
import { Module } from '@nestjs/common'
// Other Modules
import { DbModule } from '@/db/db.module'
import { JwtModule } from '@nestjs/jwt'
// Child Modules
import { TelegramModule } from '@/auth/telegram/telegram.module'
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
    TelegramModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
