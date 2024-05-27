// Node Deps
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
// Other Validators
import { TelegramAuthInput, TelegramAuthInputSchema } from '@/auth/telegram/dto/validate.dto'
// Types & Interfaces
import { EAuthWays } from '@/auth/auth.types'

enum EInvertedAuthWays {
  'TG' = 'telegram',
}

export class AuthInputSchema {
  @ApiProperty({
    name: 'type',
    type: String,
    enum: EInvertedAuthWays,
    required: true,
  })
  @IsEnum(EInvertedAuthWays)
  type: keyof typeof EAuthWays

  @ApiProperty({
    name: 'payload',
    required: true,
  })
  @ValidateNested()
  @Type(() => TelegramAuthInputSchema)
  payload: TelegramAuthInput
}

export class AuthInputTypeSchema {
  @ApiProperty({
    name: 'type',
    type: String,
    enum: EInvertedAuthWays,
    required: true,
  })
  @IsEnum(EInvertedAuthWays)
  type: keyof typeof EAuthWays

  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    minimum: 1,
    maximum: 10**10,
  })
  @IsNumber({ maxDecimalPlaces: 10 })
  id: number
}

export type AuthTypeInput = typeof AuthInputTypeSchema