// Node Deps
import { Module } from '@nestjs/common'
// Other Modules
import { DbModule } from '@/db/db.module'
// Current Module Deps
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [DbModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
}
