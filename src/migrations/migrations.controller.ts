// Node Deps
import { Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
// Other Services
import { MigrationsService } from '@/migrations/migrations.service'
// Validators
import { StartMigrationInputSchema } from '@/migrations/dto/validate.dto'
// Swagger Schemas
import { GetMigrationsProgressSchema } from '@/migrations/dto/swagger.dto'

@ApiTags('Migrations')
@Controller('migrations')
export class MigrationsController {
  constructor(
    private readonly migrationService: MigrationsService,
  ) {}

  @ApiTags('Migrations', 'admin')
  @Post('movies')
  @ApiOkResponse({ type: GetMigrationsProgressSchema })
  async migrateMovies(
    @Query() query: StartMigrationInputSchema,
  ) {
    return this.migrationService.startMigration(query)
  }

  @ApiTags('Migrations', 'admin')
  @Get('progress')
  @ApiOkResponse({ type: GetMigrationsProgressSchema })
  async getProgress(
    @Query() query: StartMigrationInputSchema,
  ) {
    return this.migrationService.getMigrationStatus(query.type)
  }
}
