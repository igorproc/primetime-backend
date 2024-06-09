// Node Deps
import { Module } from '@nestjs/common'
// Config
import Env from '@/config/env'
import Telegram from '@/config/telegram'
import Schedule from '@/config/schedule'
// Other Modules
import { DbModule } from '@/db/db.module'
import { AuthModule } from '@/auth/auth.module'
import { UserModule } from '@/user/user.module'
import { DeviceModule } from './device/device.module'

const EnvConfigModule = Env()
const TelegramConfigModule = Telegram()
const ScheduleConfigModule = Schedule()

@Module({
  imports: [
    EnvConfigModule,
    ScheduleConfigModule,
    DbModule,
    AuthModule,
    UserModule,
    TelegramConfigModule,
    DeviceModule
  ]
})

export class AppModule {
}
