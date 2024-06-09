// Node Deps
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsJWT, IsNumber, IsUUID, ValidateNested } from 'class-validator'
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
    name: 'clientId',
    type: String,
    required: true,
    example: 'f97eeecf-b553-4cad-a1af-9eb522965893',
  })
  @IsUUID()
  clientId: string

  @ApiProperty({
    name: 'payload',
    required: true,
    type: TelegramAuthInputSchema,
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

export class RevokeInputSchema {
  @ApiProperty({
    name: 'token',
    type: String,
    minimum: 128,
    maximum: 1024,
    required: true,
  })
  @IsJWT()
  token: string
}

export type TRevokeInput = typeof RevokeInputSchema

export class LogoutInputSchema {
  @ApiProperty({
    name: 'token',
    type: String,
    minimum: 128,
    maximum: 1024,
    required: true,
  })
  @IsJWT()
  token: string
}

export type TLogoutInput = typeof LogoutInputSchema