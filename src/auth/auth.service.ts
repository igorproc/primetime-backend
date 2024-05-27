// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
// Other Services
import { TelegramService } from '@/auth/telegram/telegram.service'
import { DbService } from '@/db/db.service'
// Types & Interfaces
import { EAuthWays, IAuthServiceProvider, type TAuthInput } from '@/auth/auth.types'
import { encryptWithoutSalt } from '@utils/crypt'
import { TIMES } from '@/global.const'

type TAvailableServices = TelegramService
type TServiceAdapter = { [key in EAuthWays]: TAvailableServices }

@Injectable()
export class AuthService {
  private readonly serviceAdapterByType: TServiceAdapter

  constructor(
    private readonly db: DbService,
    private readonly telegramAuthService: TelegramService
  ) {
    this.serviceAdapterByType = {
      TG: telegramAuthService
    }
  }

  private fallBackClassExemplar: IAuthServiceProvider & { httpException: unknown } = {
    httpException: new HttpException({ error: 501 }, HttpStatus.BAD_REQUEST),

    async authUser() {
      throw this.httpException
    }
  }

  protected getCurrentServiceByType(type: keyof typeof EAuthWays): IAuthServiceProvider {
    const valueFromEnum = EAuthWays[type]

    return this.serviceAdapterByType[valueFromEnum] || this.fallBackClassExemplar
  }

  protected async deleteUserIfIsNotVerified(userId: number) {
    return this.db
      .user
      .delete({
        where: {
          id: userId,
          isVerified: false,
        },
      })
  }

  protected async createMockUser() {
    const fakeMail = faker.internet.email({ allowSpecialCharacters: true })
    const fakePassword = faker.internet.password({ length: 15, prefix: 'Temp' })

    return this.db
      .user
      .create({
        data: {
          username: faker.internet.userName(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          email: fakeMail,
          password: encryptWithoutSalt(fakePassword),
          role: 'NONE',
        },
      })
  }

  async auth(type: keyof typeof EAuthWays, data: TAuthInput) {
    const userData = await this.createMockUser()

    const userTimeout = setTimeout(async () => {
      await this.deleteUserIfIsNotVerified(userData.id)
      clearTimeout(userTimeout)
    }, TIMES.halfHour)

    return await this
      .getCurrentServiceByType(type)
      .authUser(data, userData.id)
  }
}
