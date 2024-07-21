// Node Deps
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber } from 'class-validator'

export enum EMigrationsStatuses {
  PROGRESS = 'progress',
  COMPLETE = 'complete',
  ERROR = 'error',
}

export class GetMigrationsProgressSchema {
  @ApiProperty({
    name: 'status',
    type: String,
    required: true,
    enum: EMigrationsStatuses,
    example: EMigrationsStatuses.PROGRESS,
  })
  @IsEnum(EMigrationsStatuses)
  status: EMigrationsStatuses

  @ApiProperty({
    name: 'percent',
    type: Number,
    required: true,
    example: 54,
  })
  @IsNumber()
  percent: number
}