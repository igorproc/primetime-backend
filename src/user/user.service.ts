// Node Deps
import { Injectable } from '@nestjs/common'
// Other Services
import { DbService } from '@/db/db.service'

@Injectable()
export class UserService {
  constructor(
    private readonly db: DbService
  ) {}

  public async getUserById(id: number) {
    return this.db
      .user
      .findUnique({
        where: { id },
        select: {
          id: true,
          role: true,
          firstName: true,
          username: true,
          photoUrl: true,
          lastVisited: true,
        }
      })
  }
}
