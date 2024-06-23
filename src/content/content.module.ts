// Node Deps
import { Module } from '@nestjs/common'
// Other Services
import { DbModule } from '@/db/db.module'
import { AuthModule } from '@/auth/auth.module'
// Current Module Deps
import { ContentService } from '@/content/content.service'
import { BalancerController } from '@/content/controllers/balancer.controller'
// Child Modules
import { CacheModule } from '@/content/cache/cache.module'
import { KpPayModule } from '@/content/kp-pay/kp-pay.module'
import { KpModule } from '@/content/kp/kp.module'
import { ContentController } from '@/content/controllers/content.controller'

@Module({
  imports: [
    DbModule,
    AuthModule,
    CacheModule,
    KpPayModule,
    KpModule
  ],
  controllers: [
    BalancerController,
    ContentController
  ],
  providers: [ContentService],
  exports: [ContentService]
})
export class ContentModule {
}
