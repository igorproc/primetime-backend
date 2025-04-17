// Node Deps
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac'
// Other Services
import { MigrationsService } from '@/migrations/services/migrations.service'
import { MigrationsControlService } from '@/migrations/services/migrations.control.service'
// Guards
import { AuthGuard } from '@/auth/guards/auth.guard'
// Utils
import { DefaultErrorSchema } from '@/global.dto'
// Errors
import { MigrationsErrors } from '@/migrations/migrations.error'
// Validators
import { StartMigrationInputSchema } from '@/migrations/dto/validate.dto'
import { GetBalancersListInputSchema } from '@/content/balancers/dto/validate.dto'
// Swagger Schemas
import {
  GetMigrationTasksListSchema,
} from '@/migrations/dto/swagger.dto'

@ApiTags('Migrations')
@Controller('migrations')
export class MigrationsController {
  constructor(
    private readonly migrationService: MigrationsService,
    private readonly migrationControlService: MigrationsControlService,
  ) {}

  @RBAcPermissions('migration@getMigrationsList')
  @UseGuards(AuthGuard, RBAcGuard)
  @Get('list')
  @ApiOperation({ description: 'Get all available  migrations list' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetMigrationTasksListSchema })
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(MigrationsErrors.INTERNAL_SERVER_ERROR) }
  })
  async getMigrations(
    @Query() query: GetBalancersListInputSchema,
  ): Promise<GetMigrationTasksListSchema> {
    return this
      .migrationControlService
      .getMigrations(query)
  }

  @RBAcPermissions('migration@startMigration')
  @UseGuards(AuthGuard, RBAcGuard)
  @Post('start')
  @ApiOperation({ description: 'Start migrate operation' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(MigrationsErrors.INTERNAL_SERVER_ERROR) }
  })
  async startMigration(
    @Body() payload: StartMigrationInputSchema,
  ) {
    return this
      .migrationControlService
      .startMigration(payload)
  }
}
