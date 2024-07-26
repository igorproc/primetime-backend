// Node Deps
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac'
// Services
import { BalancersService } from '@/content/balancers/balancers.service'
// Guards
import { AuthGuard } from '@/auth/guards/auth.guard'
// Validators
import { GetMovieInputSchema } from '@/content/balancers/dto/validate.dto'
// Errors
import { ContentErrors } from '@/content/content.errors'
// Swagger
import { SuccessGetMovie } from '@/content/balancers/dto/swagger.dto'
import { DefaultErrorSchema } from '@/global.dto'

@ApiTags('Content')
@Controller('api/content')
export class ContentController {
  constructor(
    private readonly balancerService: BalancersService,
  ) {}

  @RBAcPermissions('watchUser@getMovie')
  @UseGuards(AuthGuard, RBAcGuard)
  @Get('movie/:id')
  @ApiTags('user')
  @ApiOperation({ description: 'Get movie by kinopoisk id' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: SuccessGetMovie })
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(ContentErrors.INTERNAL_ERROR) }
  })
  async getMovie(
    @Param() params: GetMovieInputSchema
  ) {
    if (!Number(params.id)) {
      return {}
    }

    return await this.balancerService.getters.getMovie(Number(params.id))
  }
}
