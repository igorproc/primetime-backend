// Node Deps
import { Module } from '@nestjs/common'
// Other Services
import { DbModule } from '@/db/db.module'
import { AuthModule } from '@/auth/auth.module'
// Current Module Deps
import { ContentService } from '@/content/content.service'
import { BalancerController } from '@/content/controllers/balancer.controller'
// Child Modules
import { KpPayModule } from '@/content/balancers/kp-pay/kp-pay.module'
import { KpModule } from '@/content/balancers/kp/kp.module'
import { ContentController } from '@/content/controllers/content.controller'
import { MovieModule } from '@/content/cache/movie/movie.module'

@Module({
  imports: [
    DbModule,
    AuthModule,
    KpPayModule,
    KpModule,
    MovieModule,
  ],
  controllers: [
    BalancerController,
    ContentController,
  ],
  providers: [ContentService],
  exports: [ContentService]
})
export class ContentModule {
}
