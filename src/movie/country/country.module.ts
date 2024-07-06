import { Module } from '@nestjs/common'
import { CountryService } from '@/movie/country/country.service'
import { DbModule } from '@/db/db.module'

@Module({
  imports: [DbModule],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
