import { Module } from '@nestjs/common'
import { StaffService } from './staff.service'
import { DbModule } from '@/db/db.module'

@Module({
  imports: [DbModule],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
