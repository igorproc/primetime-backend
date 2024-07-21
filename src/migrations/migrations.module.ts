// Node Deps
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
// Current Module Deps
import { MigrationsService } from '@/migrations/migrations.service'
import { MigrationsConsumer } from '@/migrations/consumers/migrations.consumer'
// Other Modules
import { MysqlModule } from '@/db/mysql/mysql.module'
import { ContentModule } from '@/content/content.module'
import { MigrationsController } from '@/migrations/migrations.controller'

@Module({
  imports: [
    MysqlModule,
    ContentModule,
    BullModule.registerQueue({ name: 'migrate' }),
  ],
  providers: [MigrationsService, MigrationsConsumer],
  controllers: [MigrationsController],
  exports: [MigrationsService],
})
export class MigrationsModule {}
