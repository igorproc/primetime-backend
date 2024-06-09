import { ApiProperty } from '@nestjs/swagger'

type TFillError = {
  code: string,
  message: string,
}

export class DefaultErrorSchema {
  constructor(errorData: TFillError) {
    this.code = errorData.code
    this.message = errorData.message
  }

  @ApiProperty({
    name: 'code',
    type: String,
    required: true,
  })
  code: string

  @ApiProperty({
    name: 'message',
    type: String,
    required: true,
  })
  message: string
}
