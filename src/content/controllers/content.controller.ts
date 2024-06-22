// Node Deps
import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RBAcPermissions } from 'nestjs-rbac'
// Services
import { ContentService } from '@/content/content.service'
// Validators
import { GetMovieInputSchema } from '@/content/dto/validate.dto'

@ApiTags('Content')
@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @RBAcPermissions('watchUser@getMovie')
  @Get('movie/:id')
  async getMovie(
    @Param() params: GetMovieInputSchema
  ) {
    if (!Number(params.id)) {
      return {}
    }

    return await this.contentService.getMovie(Number(params.id))
  }
}