// Node Deps
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
// Current Module Deps
import { MigrationsService } from '@/migrations/services/migrations.service'
import { MigrationsControlService } from '@/migrations/services/migrations.control.service'
import { MigrationsController } from '@/migrations/migrations.controller'
import { MigrationsConsumer } from '@/migrations/consumers/migrations.consumer'
import { MigrationsVideoConsumer } from '@/migrations/consumers/movie.consumer'
// Other Modules
import { DbModule } from '@/db/db.module'
import { MysqlModule } from '@/db/mysql/mysql.module'
import { BalancersModule } from '@/content/balancers/balancers.module'
import { ErrorHandlerModule } from '@/error-handler/error-handler.module'
// Const
import { MIGRATE_CONSUMER_QUEUE_NAMES } from '@/migrations/migrations.const'

@Module({
  imports: [
    DbModule,
    MysqlModule,
    BalancersModule,
    ErrorHandlerModule,
    BullModule.registerQueue({ name: MIGRATE_CONSUMER_QUEUE_NAMES.MIGRATE }),
    BullModule.registerQueue({ name: MIGRATE_CONSUMER_QUEUE_NAMES.MOVIE })
  ],
  providers: [
    MigrationsService,
    MigrationsControlService,
    MigrationsConsumer,
    MigrationsVideoConsumer
  ],
  controllers: [MigrationsController],
  exports: [MigrationsService],
})
export class MigrationsModule {}
