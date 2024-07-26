// Node Deps
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
// Current Module Deps
import { MigrationsService } from '@/migrations/migrations.service'
import { MigrationsConsumer } from '@/migrations/consumers/migrations.consumer'
// Other Modules
import { MysqlModule } from '@/db/mysql/mysql.module'
import { MigrationsController } from '@/migrations/migrations.controller'
import { BalancersModule } from '@/content/balancers/balancers.module'

@Module({
  imports: [
    MysqlModule,
    BalancersModule,
    BullModule.registerQueue({ name: 'migrate' }),
  ],
  providers: [MigrationsService, MigrationsConsumer],
  controllers: [MigrationsController],
  exports: [MigrationsService],
})
export class MigrationsModule {}
