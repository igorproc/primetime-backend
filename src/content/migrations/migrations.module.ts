// Node Deps
import { Module } from '@nestjs/common'
// Current Module Deps
import { MigrationsService } from '@/content/migrations/migrations.service'
// Other Modules
import { MysqlModule } from '@/db/mysql/mysql.module'

@Module({
  imports: [MysqlModule],
  providers: [MigrationsService],
  exports: [MigrationsService],
})
export class MigrationsModule {}
