// Node Deps
import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class TelegramAuthInputSchema {
  @ApiProperty({ type: Number, maximum: 10**8, required: true })
  @IsNumber({ maxDecimalPlaces: 10 })
  id: number

  @ApiProperty({ type: String, required: true, minimum: 2 })
  @IsString()
  firstName: string

  @ApiProperty({ type: String, required: true, minimum: 2 })
  @IsString()
  username: string

  @ApiProperty({ type: String, required: true, minimum: 2 })
  @IsString()
  photoUrl: string

  @ApiProperty({ type: Number, required: true, minimum: 2, maximum: 10**10 })
  @IsNumber()
  authDate: number

  @ApiProperty({ type: String, required: true, minimum: 2 })
  @IsString()
  hash: string
}

export type TelegramAuthInput = TelegramAuthInputSchema
