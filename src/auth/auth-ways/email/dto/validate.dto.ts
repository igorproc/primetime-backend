// Node Deps
import { IsEmail, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EmailAuthInputSchema {
  @ApiProperty({ type: String, example: 'test@iny.su' })
  @IsEmail()
  email: string

  @ApiProperty({ type: String, required: true, minimum: 5 })
  @IsString()
  password: string

  @ApiProperty({ type: String, required: true, minimum: 2 })
  @IsOptional()
  @IsString()
  username?: string

  @ApiProperty({ type: String, required: true, minimum: 2 })
  @IsOptional()
  @IsString()
  displayName?: string

  @ApiProperty({ type: String, required: true, minimum: 2 })
  @IsOptional()
  @IsString()
  photoUrl?: string
}

export type TEmailAuthInput = EmailAuthInputSchema
