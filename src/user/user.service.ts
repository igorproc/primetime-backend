// Node Deps
import { Injectable } from '@nestjs/common'
// Other Services
import { DbService } from '@/db/db.service'
// Types & Interfaces
import type { TAuthFillUserInput } from '@/user/dto/validate.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly db: DbService
  ) {}

  public async fillUserAuth(payload: TAuthFillUserInput) {
    // Заглушка
    const data = await this.db.user.findMany({
      where: { id: 1 }
    })

    return { data, payload }
  }
}
