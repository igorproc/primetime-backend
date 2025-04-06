// Node Deps
import { Injectable, Logger } from '@nestjs/common'
import { errorHandler } from '@prisma/client'
// Other Services
import { DbService } from '@/db/db.service'

interface IError {
  stack?: string,
  message?: string,
}

@Injectable()
export class ErrorHandlerService {
  private readonly logger: Logger

  constructor(
    private readonly db: DbService,
  ) {
    this.logger = new Logger()
  }

  public async handleError(error: Error | IError, logFormatter?: (error: (Error | IError)) => string, migrationId?: number) {
    let message = error?.message
    if (logFormatter) {
      message = logFormatter(error)
    }
    this.logger.error(message)

    const payload: Omit<errorHandler, 'createdAt' | 'updatedAt' | 'id'> = {
      errorStack: error?.stack || '',
      errorMessage: error?.message || '',
      migrationId: migrationId || null,
    }

    return this
      .db
      .errorHandler
      .create({ data: payload })
  }
}
