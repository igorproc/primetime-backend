// Node Deps
import { Injectable, Logger } from '@nestjs/common'
import { Process, Processor, OnQueueEvent } from '@nestjs/bull'
import { Job } from 'bull'
// Other services
import { EMigrationTaskPayload, MigrationsService } from '@/migrations/services/migrations.service'
// Movie
import { MIGRATE_CONSUMER_QUEUE_NAMES } from '@/migrations/migrations.const'
// Types & Interfaces
import { TMigrationTaskPayload } from '@/migrations/services/migrations.service'

@Injectable()
@Processor(MIGRATE_CONSUMER_QUEUE_NAMES.MIGRATE)
export class MigrationsConsumer {
  private readonly logger: Logger

  constructor(
    private readonly movieMigrations: MigrationsService,
  ) {
    this.logger = new Logger(MigrationsConsumer.name)
  }

  @Process()
  public async migrateProcess(job: Job<TMigrationTaskPayload>) {
    const { data } = job

    switch (data.type) {
      case EMigrationTaskPayload.MOVIE:
        await this.movieMigrations.startOldMoviesMigration(data)
        return true
    }
  }

  @OnQueueEvent('failed')
  onError({ data, stacktrace }: Job<TMigrationTaskPayload>) {
    this.logger.error(`Migration: ${data.type} failed`, stacktrace)
  }

  @OnQueueEvent('active')
  onActive({ data }: Job<TMigrationTaskPayload>) {
    this.logger.debug(
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
