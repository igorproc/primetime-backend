import { Controller, Ip, Post, Query } from '@nestjs/common'
import { DeviceService } from '@/device/device.service'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { availablePlatforms } from '@/device/device.const'
import { CreateDeviceSchema } from '@/device/dto/validate'

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
