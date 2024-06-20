import { Module } from '@nestjs/common'
import { DeviceService } from './device.service'
import { DbModule } from '@/db/db.module'
import { DeviceController } from './device.controller'

@Module({
  imports: [DbModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService]
})
export class DeviceModule {
}
