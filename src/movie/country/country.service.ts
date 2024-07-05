import { Injectable } from '@nestjs/common'
import { DbService } from '@/db/db.service'

@Injectable()
export class CountryService {
  constructor(
    private readonly db: DbService,
  ) {}

  public async findOrCreateGenreByName(name: string) {
    let data = await this.db
      .country
      .findUnique({ where: { name } })

    if (!data) {
      data = await this.db
        .country
        .create({
          data: { name }
        })
    }
    return {
      id: data.id,
      name: data.name,
    }
  }
}
