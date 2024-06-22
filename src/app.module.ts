// Node Deps
import { Module } from '@nestjs/common'
// Config
import Env from '@/config/env'
import Telegram from '@/config/telegram'
import Schedule from '@/config/schedule'
import Rbac from '@/config/rbac'
// Other Modules
import { DbModule } from '@/db/db.module'
import { AuthModule } from '@/auth/auth.module'
import { UserModule } from '@/user/user.module'
import { DeviceModule } from './device/device.module'
import { ContentModule } from './content/content.module';

const EnvConfigModule = Env()
const TelegramConfigModule = Telegram()
const ScheduleConfigModule = Schedule()
const RbacConfigModule = Rbac()

@Module({
  imports: [
    EnvConfigModule,
    ScheduleConfigModule,
    TelegramConfigModule,
    DbModule,
    RbacConfigModule,
    UserModule,
    DeviceModule,
    AuthModule,
    ContentModule,
  ]
})

export class AppModule {}
