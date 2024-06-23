import { Module } from '@nestjs/common';
import { KpService } from './kp.service';

@Module({
  providers: [KpService],
  exports: [KpService],
})
export class KpModule {}
