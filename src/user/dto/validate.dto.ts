// Node Deps
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
// Validators
import { AuthInputTypeSchema, type AuthTypeInput } from '@/auth/dto/validate.dto'

export class AuthFillUserSchema {
  @ApiProperty({ name: 'type', type: Object, required: true })
  @ValidateNested()
  @Type(() => AuthInputTypeSchema)
  type: AuthTypeInput

  @ApiProperty({ name: 'payload', type: Object, required: true })
  @ValidateNested()
  @Type(() => AuthFillUserPayloadSchema)
  payload: TAuthFillUserInput
}

class AuthFillUserPayloadSchema {
  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    minimum: 3,
    maximum: 64,
  })
  @IsEmail()
  @MinLength(3)
  @MaxLength(64)
  email: string

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    minimum: 3,
    maximum: 32,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  password: string

  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    minimum: 3,
    maximum: 32,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  name: string

  @ApiProperty({
    name: 'surname',
    type: String,
    required: true,
    minimum: 3,
    maximum: 32,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  surname: string
}

export type TAuthFillUserInput = typeof AuthFillUserSchema