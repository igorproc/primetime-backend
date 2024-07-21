// Node Deps
import { Injectable, Logger } from '@nestjs/common'
import { Process, Processor, OnQueueEvent } from '@nestjs/bull'
import { Job } from 'bull'
// Other services
import { MigrationsService } from '@/migrations/migrations.service'
import { ContentService } from '@/content/content.service'
// Validators
import { StartMigrationInputSchema } from '@/migrations/dto/validate.dto'
// Types & Interfaces
import { TMigrationTaskPayload } from '@/migrations/migrations.service'
import { asyncWhile } from '@/content/utils/loop'

@Injectable()
@Processor('migrate')
export class MigrationsConsumer {
  private readonly logger: Logger
  private readonly MIGRATION_STEP: number

  constructor(
    private readonly migrations: MigrationsService,
    private readonly content: ContentService,
  ) {
    this.logger = new Logger(MigrationsConsumer.name)
    this.MIGRATION_STEP = 30
  }

  private async migrateMovies(job: Job<TMigrationTaskPayload>) {
    const waitFor = (delay: number) => new Promise(resolve => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(true)
      }, delay)
    })

    const totalRecords = await this.migrations.getRecordsCount('movie')
    const action = async (currentIndex: number) => {
      const ids = await this.migrations.getMoviesIds(currentIndex, this.MIGRATION_STEP)
      const promiseChain = []

      ids.forEach(id => {
        promiseChain.push(
          this.content.getMovie(id)
        )
      })

      try {
        await Promise.allSettled(promiseChain)
        await waitFor(100)
      } catch (error) {
        this.logger.fatal(error)
      }

      const jobProgress = ((currentIndex / totalRecords) * 100).toFixed()
      await job.progress(jobProgress)
    }

    for (let currentIndex = 0; totalRecords > currentIndex; currentIndex += this.MIGRATION_STEP) {
      await action(currentIndex)
    }
  }

  @Process()
  public async migrateProcess(job: Job<TMigrationTaskPayload>) {
    const { data } = job

    switch (data.type) {
      case 'MOVIE':
        await this.migrateMovies(job)
        return true
    }
  }

  @OnQueueEvent('failed')
  onError({ data, stacktrace }: Job<TMigrationTaskPayload>) {
    this.logger.error(`Migration ${data.type} failed`, stacktrace)
  }

  @OnQueueEvent('active')
  onActive({ data }: Job<TMigrationTaskPayload>) {
    this.logger.log(
      `Migration: ${data.type} in progress`,
    )
  }

  @OnQueueEvent('completed')
  onCompleted({ data }: Job<TMigrationTaskPayload>) {
    this.logger.debug(
      `Migration: ${data.type} complete`
    )
  }
}
