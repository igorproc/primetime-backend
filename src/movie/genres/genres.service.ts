import { Injectable } from '@nestjs/common'
import { DbService } from '@/db/db.service'

@Injectable()
export class GenresService {
  constructor(
    private readonly db: DbService,
  ) {}

  public async findOrCreateGenreByName(name: string) {
    let data = await this.db
      .genre
      .findUnique({ where: { name } })
    if (!data) {
      data = await this.db
        .genre
        .create({
          data: {
            name,
            popularity: 100,
          }
        })
    }

    return {
      id: data.id,
      name: data.name,
      popularity: data.popularity,
    }
  }
}
