// Node Deps
import { Injectable, Logger } from '@nestjs/common'
import { Process, Processor, OnQueueEvent } from '@nestjs/bull'
import { Job } from 'bull'
// Other services
import { EMigrationTaskPayload, MigrationsService } from '@/migrations/services/migrations.service'
import { ErrorHandlerService } from '@/error-handler/error-handler.service'
// Const
import { MIGRATE_CONSUMER_QUEUE_NAMES } from '@/migrations/migrations.const'
// Types & Interfaces
import { TMigrationTaskPayload } from '@/migrations/services/migrations.service'

@Injectable()
@Processor(MIGRATE_CONSUMER_QUEUE_NAMES.MOVIE)
export class MigrationsVideoConsumer {
  private readonly logger: Logger

  constructor(
    private readonly migrations: MigrationsService,
    private readonly errorHandler: ErrorHandlerService,
  ) {
    this.logger = new Logger(MigrationsVideoConsumer.name)
  }

  @Process()
  public async migrateProcess(job: Job<TMigrationTaskPayload>) {
    const { data } = job

    switch (data.type) {
      case EMigrationTaskPayload.MOVIE_DETAIL:
        await this.migrations.migrateMovie(data.externalId)
        return true
    }
  }

  @OnQueueEvent('failed')
  async onError({ stacktrace, failedReason }: Job<TMigrationTaskPayload>) {
    const logFormatter = (error: Error) => `Migration: MIGRATE_MOVE failed \n ${error?.stack}`

    await this.errorHandler.handleError(
      { message: failedReason, stack: stacktrace.join('\n') },
      logFormatter
    )
  }
}
