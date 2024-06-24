// Node Deps
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
// Services
import { ContentService } from '@/content/content.service'
// Guards
import { AuthGuard } from '@/auth/guards/auth.guard'
// Validators
import {
  AddBalancerTokenInputSchema,
  ChangeActiveBalancerInputSchema,
  GetBalancersListInputSchema,
} from '@/content/dto/validate.dto'
// Swagger Schemas
import { DefaultErrorSchema } from '@/global.dto'
import {
  SuccessChangeContentBalancer,
  SuccessGetContentBalancerList
} from '@/content/dto/swagger.dto'
// Errors
import { ContentErrors } from '@/content/content.errors'

@ApiTags('Content Balancers')
@Controller('api/balancer')
export class BalancerController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @RBAcPermissions('dataBalancerAdmin@update')
  @UseGuards(AuthGuard, RBAcGuard)
  @ApiOperation({ description: 'Change current content balancer engine' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuccessChangeContentBalancer })
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(ContentErrors.INTERNAL_ERROR) }
  })
  @Post('change-engine')
  async change(
    @Query() query: ChangeActiveBalancerInputSchema
  ): Promise<SuccessChangeContentBalancer> {
    return await this.contentService.changeService(query.code)
  }

  @RBAcPermissions('dataBalancerAdmin@add')
  @UseGuards(AuthGuard, RBAcGuard)
  @ApiOperation({ description: 'Add token for balancer by his code' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuccessChangeContentBalancer })
  @Post('add-token')
  async addToken(
    @Body() payload: AddBalancerTokenInputSchema
  ): Promise<SuccessChangeContentBalancer> {
    return await this.contentService.addToken(payload)
  }

  @RBAcPermissions('dataBalancerAdmin@get')
  @UseGuards(AuthGuard, RBAcGuard)
  @ApiOperation({ description: 'Get all content balancers list' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuccessGetContentBalancerList })
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(ContentErrors.INTERNAL_ERROR) }
  })
  @Get('list')
  async getAll(
    @Query() query: GetBalancersListInputSchema
  ): Promise<SuccessGetContentBalancerList> {
    if (
      (query?.page && !Number(query?.page)) ||
      (query?.size && !Number(query.size))
    ) {
      return {
        balancers: [],
        totalItems: 0,
        totalPages: 0,
      }
    }

    return this.contentService.getAllServices({
      page: Number(query.page),
      size: Number(query.size),
    })
  }
}
