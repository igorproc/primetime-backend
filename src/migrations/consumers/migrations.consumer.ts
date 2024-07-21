// Node Deps
import { Injectable, Logger } from '@nestjs/common'
import { Process, Processor, OnQueueEvent } from '@nestjs/bull'
import { Job } from 'bull'
// Other services
import { MigrationsService } from '@/migrations/migrations.service'
import { ContentService } from '@/content/content.service'
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
    this.MIGRATION_STEP = 15
  }

  private async migrateMovies(job: Job<TMigrationTaskPayload>) {
    let currentIndex = 0

    const totalRecords = await this.migrations.getRecordsCount('movie')
    const condition = () => totalRecords > currentIndex
    const action = async () => {
      const ids = await this.migrations.getMoviesIds(currentIndex, this.MIGRATION_STEP)
      for (const id of ids) {
        await this.content.getMovie(id)
      }

      const jobProgress = ((currentIndex / totalRecords) * 100).toFixed()
      await job.progress(jobProgress)
      currentIndex += this.MIGRATION_STEP
    }

    await asyncWhile(condition, action, 100)
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
