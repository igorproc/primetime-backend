import { Module } from '@nestjs/common'
import { KpPayService } from './kp-pay.service'

@Module({
  providers: [KpPayService],
  exports: [KpPayService]
})
export class KpPayModule {
}
