import { Module } from '@nestjs/common'
import { KpService } from '@/content/balancers/kp/kp.service'

@Module({
  providers: [KpService],
  exports: [KpService]
})
export class KpModule {
}
