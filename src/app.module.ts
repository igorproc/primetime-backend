// Node Deps
import { Module } from '@nestjs/common'
// Config
import Env from '@/config/env'
import Telegram from '@/config/telegram'
import Schedule from '@/config/schedule'
// Other Modules
import { DbModule } from '@/db/db.module'

const EnvModule = Env()
const TelegramModule = Telegram()
const ScheduleModule = Schedule()

@Module({
  imports: [
    EnvModule,
    TelegramModule,
    ScheduleModule,
    DbModule,
  ],
})

export class AppModule {}
