import { ApiProperty } from '@nestjs/swagger'

export class SuccessAuthSchema {
  @ApiProperty({
    name: 'id',
    type: Number,
    minimum: 1,
    maximum: 10**8,
    required: true,
  })
  id: number
}
