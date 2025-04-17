import { Injectable } from '@nestjs/common'
import { DbService } from '@/db/db.service'

@Injectable()
export class StaffService {
  constructor(
    private readonly db: DbService,
  ) {
  }

  public async getListByKinopoiskId(kinopoiskId: number) {
    const movie = await this
      .db
      .watchContent
      .findUnique({
        select: { id: true },
        where: { kinopoiskId },
      })

    if (!movie.id) {
      return null
    }

    const movieStaff = await this
      .db
      .movieStaff
      .findMany({
        select: {
          staffInfo:
            {
              select: { kinopoiskId: true }
            }
        },
        where: { movieContentId: movie.id },
      })

    return [
      ...new Set(
        movieStaff.map(staff => staff.staffInfo.kinopoiskId),
      ),
    ]
  }
}
