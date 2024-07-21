import { IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

enum EAvailableMigrations {
  MOVIE = 'MOVIE',
}

export class StartMigrationInputSchema {
  @ApiProperty({
    name: 'type',
    type: String,
    enum: EAvailableMigrations,
    required: true,
    example: EAvailableMigrations.MOVIE,
  })
  @IsEnum(EAvailableMigrations)
  type: EAvailableMigrations
}
