import { Injectable } from '@nestjs/common'
import { DbService } from '@/db/db.service'
import { type IGetStaffInfo } from '@/content/balancers/balancer.types'

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

    if (!movie?.id) {
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

    const ids = [
      ...new Set(
        movieStaff.map(staff => staff.staffInfo.kinopoiskId),
      ),
    ]

    return {
      movieId: movie.id,
      staffIds: ids,
    }
  }

  public async findByStaffKinopoiskId(staffKinopoiskId: number) {
    const infoData = this.db.staffInfo.findUnique({
      where: { kinopoiskId: staffKinopoiskId },
    })

    if (!infoData) {
      return null
    }

    return infoData
  }

  public async cacheStaff(data: IGetStaffInfo) {
    const staffData = await this.db
      .staffInfo
      .create({
        data: {
          kinopoiskId: data.staffKinopoiskId,
          name: data.name,
          nameAlt: data.nameAlt,
          sex: data.sex,
          growth: data.growth,
          birthday: data.birthday,
          birthplace: data.birthplace,
          deathplace: data.deathplace,
          avatarUrl: data.avatarUrl,
          ...(data.linkFacts?.length ? {
            staffFact: {
              createMany: {
                data: data.linkFacts.map(fact => ({ content: fact })),
              },
            },
          } : {}),
        },
      })

    return staffData
  }
}
