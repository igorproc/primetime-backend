import { Module } from '@nestjs/common'
import { MovieService } from './movie.service'
import { DbModule } from '@/db/db.module'
import { GenresModule } from '@/movie/genres/genres.module'
import { CountryModule } from '@/movie/country/country.module'

@Module({
  imports: [DbModule, CountryModule, GenresModule],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
