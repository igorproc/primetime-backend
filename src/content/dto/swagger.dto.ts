// Node Deps
import { ApiProperty } from '@nestjs/swagger'
// Types & Interfaces
import {
  balancer_code as EBalancerCodes,
  balancer_status as EBalancerStatus,
} from '@prisma/client'

export class SuccessChangeContentBalancer {
  @ApiProperty({
    name: 'success',
    type: Boolean,
    required: true,
    example: true,
  })
  success: boolean
}

export class BalancerItemSchema {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    example: 1,
  })
  id: number

  @ApiProperty({
    name: 'code',
    type: String,
    required: true,
    enum: EBalancerCodes,
    example: EBalancerCodes.KP,
  })
  code: EBalancerCodes

  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    example: 'Кинопоиск официальное (не совсем) API'
  })
  name: string

  @ApiProperty({
    name: 'documentationLink',
    type: String,
    required: true,
    example: 'https://kinopoiskapiunofficial.tech/profile'
  })
  documentationLink: string

  @ApiProperty({
    name: 'status',
    type: String,
    required: true,
    enum: EBalancerStatus,
    example: EBalancerStatus.ONLINE,
  })
  status: string

  @ApiProperty({
    name: 'selected',
    type: Boolean,
    required: true,
    example: true,
  })
  selected: boolean
}

export class SuccessGetContentBalancerList {
  @ApiProperty({
    name: 'totalItems',
    type: Number,
    required: true,
    example: 12,
  })
  totalItems: number

  @ApiProperty({
    name: 'totalPages',
    type: Number,
    required: true,
    example: 1,
  })
  totalPages: number

  @ApiProperty({
    name: 'items',
    type: () => [BalancerItemSchema],
    required: true,
  })
  balancers: BalancerItemSchema[]
}
