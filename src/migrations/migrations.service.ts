// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
// Other Modules
import { MysqlService } from '@/db/mysql/mysql.service'
// Utils
import { generateId } from '@utils/generate'
// Validators
import { StartMigrationInputSchema } from '@/migrations/dto/validate.dto'
// Swagger Schemas
// Types & Interfaces
import { EMigrationsStatuses, GetMigrationsProgressSchema } from '@/migrations/dto/swagger.dto'
import { MigrationsErrors } from '@/migrations/migrations.error'

type TMovieRecordsCount = {
  count: number
}

type TMovieRecords = {
  kinopoiskId: number
}

type TMigrationsIds = {
  movie: number | string | null
}

export type TMigrationTaskPayload = {
  type: StartMigrationInputSchema['type']
}

@Injectable()
export class MigrationsService {
  private readonly migrationsJobIds: TMigrationsIds

  constructor(
    private readonly mysql: MysqlService,
    @InjectQueue('migrate') private migrationsQueue: Queue<TMigrationTaskPayload>
  ) {
    this.migrationsJobIds = { movie: null }
  }

  public async getRecordsCount(type: 'movie') {
    const conditionMap = { 'movie': 'WatchContent' }
    const query = `SELECT COUNT(*) AS count FROM ${conditionMap[type]}`

    try {
      const recordsCount = await this.mysql
        .executeQuery<TMovieRecordsCount>(query)
      const splashResponse: TMovieRecordsCount = recordsCount[0][0]

      return splashResponse?.count || null
    } catch (error) {
      throw new HttpException(
        `[Migration/mysql] Query /${query}/ error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async getMoviesIds(index: number, step: number): Promise<number[]> {
    const query = 'SELECT kinopoiskId FROM WatchContent WHERE id BETWEEN ? AND ?'

    try {
      const data = await this.mysql
        .executeQuery(query, [index, index + step])

      return data[0]?.map((item: TMovieRecords) => item.kinopoiskId)
    } catch (error) {
      console.error(error)
      throw new HttpException(
        `[Migration/mysql] Query /${query}/ error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async startMigration(payload: StartMigrationInputSchema): Promise<GetMigrationsProgressSchema> {
    const job = await this.migrationsQueue.add(
      { type: payload.type },
      { priority: 3, jobId: generateId() },
    )

    this.migrationsJobIds[payload.type] = job.id
    return { status: EMigrationsStatuses.PROGRESS, percent: 0 }
  }

  public async getMigrationStatus(type: StartMigrationInputSchema['type']): Promise<GetMigrationsProgressSchema> {
    const jobId = this.migrationsJobIds[type]
    const job = await this.migrationsQueue.getJob(jobId)
    if (!job) {
      throw new HttpException(
        MigrationsErrors,
        HttpStatus.BAD_REQUEST
      )
    }

    const jobProgress = Number(job.progress())

    if (await job.isFailed()) {
      return { status: EMigrationsStatuses.ERROR, percent: jobProgress }
    }

    return {
      status: job.isCompleted() ? EMigrationsStatuses.COMPLETE : EMigrationsStatuses.PROGRESS,
      percent: jobProgress
    }
  }
}
