// Node Deps
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RBAcGuard, RBAcPermissions } from 'nestjs-rbac'
// Services
import { ContentService } from '@/content/content.service'
// Guards
import { AuthGuard } from '@/auth/guards/auth.guard'
// Validators
import { GetMovieInputSchema } from '@/content/dto/validate.dto'
// Swagger
import { SuccessGetMovie } from '@/content/dto/swagger.dto'

@ApiTags('Content')
@Controller('api/content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @RBAcPermissions('watchUser@getMovie')
  @UseGuards(AuthGuard, RBAcGuard)
  @Get('movie/:id')
  @ApiOperation({ description: 'Get movie by kinopoisk id' })
  @ApiOkResponse({ type: SuccessGetMovie })
  async getMovie(
    @Param() params: GetMovieInputSchema
  ) {
    if (!Number(params.id)) {
      return {}
    }

    return await this.contentService.getMovie(Number(params.id))
  }
}
