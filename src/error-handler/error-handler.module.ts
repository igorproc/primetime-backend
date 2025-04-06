// Node Deps
import { Module } from '@nestjs/common'
// Current Module Deps
import { ErrorHandlerService } from './error-handler.service'
// Other Modules
import { DbModule } from '@/db/db.module'

@Module({
  imports: [DbModule],
  providers: [ErrorHandlerService],
  exports: [ErrorHandlerService],
})
export class ErrorHandlerModule {}
