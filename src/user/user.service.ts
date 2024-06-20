// Node Deps
import { Injectable } from '@nestjs/common'
// Other Services
import { DbService } from '@/db/db.service'

@Injectable()
export class UserService {
  constructor(
    private readonly db: DbService
  ) {}
}
