// Node Deps
import { Module } from '@nestjs/common'
// Other Modules
import { DbModule } from '@/db/db.module'
// Child Modules
import { TelegramModule } from './telegram/telegram.module'
// Current Module Deps
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TelegramModule, DbModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
