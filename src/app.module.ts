// Node Deps
import { Module } from '@nestjs/common'
// Config
import Env from '@/config/modules/env'
import Telegram from '@/config/modules/telegram'
import Schedule from '@/config/modules/schedule'
import Rbac from '@/config/modules/rbac'
// Other Modules
import { DbModule } from '@/db/db.module'
import { AuthModule } from '@/auth/auth.module'
import { UserModule } from '@/user/user.module'
import { DeviceModule } from '@/device/device.module'
import { ContentModule } from '@/content/content.module'
import { GenresModule } from './movie/genres/genres.module'
import { CountryService } from './movie/country/country.service'
import { CountryModule } from './movie/country/country.module'

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
    GenresModule,
    CountryModule
  ],
  providers: [CountryService]
})

export class AppModule {
}
