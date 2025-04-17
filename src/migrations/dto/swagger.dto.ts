// Node Deps
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber } from 'class-validator'

export enum EMigrationsStatuses {
  PROGRESS = 'progress',
  COMPLETE = 'complete',
  ERROR = 'error',
}

class MigrationTaskSchema {
  @ApiProperty({
    name: 'id',
    type: Number,
    required: true,
    example: 1,
  })
  id: number

  @ApiProperty({
    name: 'title',
    type: String,
    required: true,
    example: 'MovieMigration',
  })
  title: string

  @ApiProperty({
    name: 'description',
    type: String,
    required: true,
    example: 'Start Movie Migration From Old Version',
  })
  description: string

  @ApiProperty({
    name: 'code',
    type: String,
    required: true,
    example: 'MOVIE',
  })
  code: string
}

export class GetMigrationTasksListSchema {
  @ApiProperty({
    name: 'items',
    type: () => [MigrationTaskSchema],
    required: true,
  })
  items: MigrationTaskSchema[]

  @ApiProperty({
    name: 'totalPages',
    type: Number,
    required: true,
    example: 1,
  })
  totalPages: number
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
