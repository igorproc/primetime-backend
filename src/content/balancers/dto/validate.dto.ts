// Node Deps
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
// Decorators
import { IsActivationKey } from '@decorators/validators'
// Types & Interfaces
import { balancer_code as EBalancerCodes } from '@prisma/client'

export class ChangeActiveBalancerInputSchema {
  @ApiProperty({
    name: 'code',
    type: String,
    enum: EBalancerCodes,
    required: true,
    example: EBalancerCodes.KP,
  })
  @IsEnum(EBalancerCodes)
  code: EBalancerCodes
}

export class AddBalancerTokenInputSchema {
  @ApiProperty({
    name: 'code',
    type: String,
    enum: EBalancerCodes,
    required: true,
    example: EBalancerCodes.KP,
  })
  @IsEnum(EBalancerCodes)
  code: EBalancerCodes

  @ApiProperty({
    name: 'token',
    type: String,
    required: true,
    example: 'QNBKK6A-SH1MBBH-KRKS34C-PNG0YBJ',
  })
  @IsActivationKey()
  token: string
}

export class GetBalancersListInputSchema {
  @ApiProperty({
    name: 'page',
    type: Number,
    description: 'Current Page Number (Start with 1)',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly page?: number

  @ApiProperty({
    name: 'size',
    type: Number,
    description: 'Page size',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly size?: number
}

export class GetMovieInputSchema {
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    example: 535341,
  })
  @IsString()
  id: string
}
