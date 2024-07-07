import { Module } from '@nestjs/common'
import { DbService } from './db.service'
import { MysqlModule } from './mysql/mysql.module';

@Module({
  providers: [DbService],
  exports: [DbService],
  imports: [MysqlModule]
})
export class DbModule {}
