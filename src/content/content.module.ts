// Node Deps
import { Module } from '@nestjs/common'
// Other Services
import { DbModule } from '@/db/db.module'
import { AuthModule } from '@/auth/auth.module'
// Child Modules
import { MovieModule } from '@/content/cache/movie/movie.module'
import { BalancersModule } from './balancers/balancers.module'
import { StaffModule } from './cache/staff/staff.module'

@Module({
  imports: [
    DbModule,
    AuthModule,
    MovieModule,
    BalancersModule,
    StaffModule,
  ],
})
export class ContentModule {
}
