// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
// Other Modules
import { MysqlService } from '@/db/mysql/mysql.service'
import { BalancersService } from '@/content/balancers/balancers.service'
// Utils
import { generateId } from '@utils/generate'
// Const
import { MIGRATE_CONSUMER_QUEUE_NAMES } from '@/migrations/migrations.const'
// Types
import type { TTaskRedisStore } from '@/migrations/migrations.types'

export enum EMigrationTaskPayload {
  MOVIE = 'MOVIE',
  MOVIE_DETAIL = 'MOVIE_DETAIL'
}

type TMovieRecordsCount = {
  count: number
}

type TMovieRecords = {
  kinopoiskId: number
}

export type TMigrationTaskPayload = {
  type: EMigrationTaskPayload,
  jobId: string,
  externalId?: number
}

@Injectable()
export class MigrationsService {
  private stepMigrationIds: number[]
  private readonly STEP_QUERY_OFFSET: number
  private readonly TASK_LIFETIME: TTaskRedisStore

  constructor(
    private readonly mysql: MysqlService,
    private readonly balancer: BalancersService,
    @InjectQueue(MIGRATE_CONSUMER_QUEUE_NAMES.MOVIE) private migrationVideoQueue: Queue<TMigrationTaskPayload>
  ) {
    this.STEP_QUERY_OFFSET = 500
    this.TASK_LIFETIME = { age: 10, count: 100 }
    this.stepMigrationIds = []
  }

  private async waitCacheStep() {
    return new Promise<boolean>(resolve => {
      const interval = setInterval(() => {
        if (this.stepMigrationIds.length) {
          return
        }

        clearInterval(interval)
        resolve(true)
      }, 100)
    })
  }

  private async getRecordsCount(type: 'movie') {
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

  private async getMoviesIds(index: number, step: number): Promise<number[]> {
    const query = 'SELECT kinopoiskId FROM WatchContent WHERE id BETWEEN ? AND ?'

    try {
      const data = await this.mysql
        .executeQuery(query, [index, index + step])

      return data[0]?.map((item: TMovieRecords) => item.kinopoiskId)
    } catch (error) {
      throw new HttpException(
        `[Migration/mysql] Query /${query}/ error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  private async addMigrateMovieTasks(movieIds: number[], jobId: string) {
    this.stepMigrationIds = movieIds

    for (const value of movieIds) {
      const id = generateId()

      await this
        .migrationVideoQueue
        .add(
          { type: EMigrationTaskPayload.MOVIE_DETAIL, jobId, externalId: value },
          { priority: 2, jobId: id, removeOnFail: this.TASK_LIFETIME, removeOnComplete: this.TASK_LIFETIME },
        )
    }
  }

  public async startOldMoviesMigration(payload: Omit<TMigrationTaskPayload, 'externalId'>) {
    const totalRecords = await this.getRecordsCount('movie')
    const totalIterationTimes =  Math.ceil(totalRecords / this.STEP_QUERY_OFFSET)

    for (let index = 0; index < totalIterationTimes; index += 1) {
      const currentIndex = index * this.STEP_QUERY_OFFSET
      const oldIds = await this.getMoviesIds(currentIndex, currentIndex + this.STEP_QUERY_OFFSET)

      await this.addMigrateMovieTasks(oldIds, payload.jobId)
      await this.waitCacheStep()
    }
  }

  public async migrateMovie(searchKinopoiskId: number) {
    const { kinopoiskId } = await this
      .balancer
      .getters
      .getMovie(searchKinopoiskId)
    this.stepMigrationIds = this.stepMigrationIds.filter(item => item !== kinopoiskId)

    return kinopoiskId
  }
}
