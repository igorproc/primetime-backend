// Node Deps
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
// Other Services
import { DbService } from '@/db/db.service'
// Errors
import { MigrationsErrors } from '@/migrations/migrations.error'
// Utils
import { generateId, getPageDataSize } from '@utils/generate'
// Const
import { REDIS_KEYS_MAP } from '@/migrations/migrations.const'
// Types
import type { GetBalancersListInputSchema } from '@/content/balancers/dto/validate.dto'
import type { GetMigrationTasksListSchema } from '@/migrations/dto/swagger.dto'
import type { EAvailableMigrations, StartMigrationInputSchema } from '@/migrations/dto/validate.dto'
import type { TTaskRedisStore } from '@/migrations/migrations.types'

type TMigrationPayload = {
  type: EAvailableMigrations,
  jobId: string
}

@Injectable()
export class MigrationsControlService {
  DEFAULT_PAGE_SIZE: number
  TASK_LIFETIME: TTaskRedisStore
  logger: Logger

  constructor(
    private db: DbService,
    @InjectQueue('migrate') private queue: Queue<TMigrationPayload>
  ) {
    this.DEFAULT_PAGE_SIZE = 12
    this.TASK_LIFETIME = { age: 60 * 60, count: 100 }
    this.logger = new Logger()
  }

  async getMigrations(queryData: GetBalancersListInputSchema): Promise<GetMigrationTasksListSchema> {
    try {
      const space = getPageDataSize(queryData.page, queryData.size, this.DEFAULT_PAGE_SIZE)
      const totalItems = await this.db.dataBalancer.count()

      const list = await this
        .db
        .avliableMigrationTasks
        .findMany({
          ...space,
          select: { id: true, title: true, description: true, code: true }
        })

      return {
        items: list,
        totalPages: Math.ceil(totalItems / (space.skip || this.DEFAULT_PAGE_SIZE)),
      }
    } catch (error) {
      throw new HttpException(
        MigrationsErrors.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async startMigration(payload: StartMigrationInputSchema) {
    try {
      const redisJobName = REDIS_KEYS_MAP[payload.type]
      const isCodeExists = await this
        .db
        .avliableMigrationTasks
        .findUnique({
          where: { code: payload.type },
          select: { code: true }
        })

      if (!isCodeExists || !redisJobName) {
        throw new HttpException(
          MigrationsErrors.NO_EXISTS_MIGRATION_CODE,
          HttpStatus.BAD_REQUEST
        )
      }

      const jobId = generateId()
      const jobData = await this.queue.add(
        { type: payload.type, jobId },
        { priority: 1, jobId, removeOnFail: this.TASK_LIFETIME, removeOnComplete: this.TASK_LIFETIME },
        )

      const taskSelect = {
        select: { title: true, description: true }
      }
      return await this
        .db
        .runnableTasks
        .create({
          data: { code: jobData.data.type, redisJobId: jobData.data.jobId },
          select: { id: true, code: true, tasks: taskSelect }
        })
    } catch (error) {
      throw error
    }
  }
}
