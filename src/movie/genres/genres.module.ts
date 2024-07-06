import { Module } from '@nestjs/common'
import { GenresService } from './genres.service'
import { DbModule } from '@/db/db.module'

@Module({
  imports: [DbModule],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
