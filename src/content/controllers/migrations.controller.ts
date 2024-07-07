import {Controller, Post} from '@nestjs/common'
import {ContentService} from '@/content/content.service'
import {ApiTags} from '@nestjs/swagger'

@ApiTags('Migrations')
@Controller('api/content/migrations')
export class MigrationsController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @ApiTags('admin')
  @Post('movies')
  async getMovie() {
    return this.contentService.migrateMovies()
  }
}
