import { IsEnum } from 'class-validator'
import { EInputPlatforms } from '@/device/device.const'

export class CreateDeviceSchema {
  @IsEnum(EInputPlatforms)
  platform: keyof typeof EInputPlatforms
}
