// Node Deps
import { Controller, Ip, Post, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
// Services
import { DeviceService } from '@/device/device.service'
// Swagger Schema
import { CreateDeviceSchema } from '@/device/dto/validate'
// Types & Interfaces
import { availablePlatforms } from '@/device/device.const'

@Controller('device')
@ApiTags('Device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
  ) {}

  @Post('create')
  @ApiQuery({ name: 'platform', enum: Object.keys(availablePlatforms) })
  async createClientId(
    @Ip() ip: string,
    @Query() query: CreateDeviceSchema,
  ) {
    return await this.deviceService.createClientId(ip, availablePlatforms[query.platform])
  }
}
