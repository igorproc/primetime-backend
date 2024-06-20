// Node Deps
import { Module } from '@nestjs/common'
//
import { TelegramService } from './telegram.service'
import { DbModule } from '@/db/db.module'

@Module({
  imports: [DbModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
