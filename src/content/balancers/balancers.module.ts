// Node Deps
import { Module } from '@nestjs/common'
// Current Module Deps
import { BalancersService } from '@/content/balancers/balancers.service'
import { BalancerController } from '@/content/balancers/controllers/balancer.controller'
import { ContentController } from '@/content/balancers/controllers/content.controller'
// Other Modules
import { DbModule } from '@/db/db.module'
import { KpModule } from '@/content/balancers/kp/kp.module'
import { KpPayModule } from '@/content/balancers/kp-pay/kp-pay.module'
import { MovieModule } from '@/content/cache/movie/movie.module'

@Module({
  imports: [KpModule, KpPayModule, DbModule, MovieModule],
  providers: [BalancersService],
  controllers: [BalancerController, ContentController],
  exports: [BalancersService],
})
export class BalancersModule {}
