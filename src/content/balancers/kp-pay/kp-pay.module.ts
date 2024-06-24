import { Module } from '@nestjs/common'
import { KpPayService } from '@/content/balancers/kp-pay/kp-pay.service'

@Module({
  providers: [KpPayService],
  exports: [KpPayService]
})
export class KpPayModule {
}
