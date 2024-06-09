// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { env } from 'process'
// Other Service Deps
import { DbService } from '@/db/db.service'
// Errors
import { TelegramErrors } from '@/auth/telegram/telegram.errors'
// Utils
import { cryptStringToSha256, cryptStringToSha256ByKey } from '@utils/crypt'
import { getCurrentDate, getCurrentTimestamp } from '@utils/time'
// Constants
import { MAX_PAYLOAD_LIFE } from '@/global.const'
// Types & Interfaces
import { type user, user_roles } from '@prisma/client'
import type { IAuthServiceProvider } from '@/auth/auth.types'
import type { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'
import { ETelegramHmacTokenFields } from '@/auth/telegram/telegram.types'

type TTelegramDataCreate = Omit<user, 'createdAt' | 'updatedAt'>
@Injectable()
export class TelegramService implements IAuthServiceProvider {
  constructor(
    private readonly db: DbService
  ) {}

  private validateTelegramData(userData: TelegramAuthInput) {
    const tokenHash = cryptStringToSha256(env.TELEGRAM_TOKEN)
    const hash = userData.hash
    delete userData.hash

    const payload = Object.keys(userData)
      .map(key => `${ETelegramHmacTokenFields[key]}=${userData[key]}`)
      .sort()
      .join('\n')

    const dataHmac = cryptStringToSha256ByKey(payload, tokenHash)
    return dataHmac === hash
  }

  public async authUser(data: TelegramAuthInput) {
    const dataIsValid = this.validateTelegramData(data)
    const currentTimestamp = getCurrentTimestamp()
    const dataIsExpired = currentTimestamp - data.authDate > MAX_PAYLOAD_LIFE

    if (!dataIsValid) {
      throw new HttpException(
        TelegramErrors.BAD_PAYLOAD,
        HttpStatus.NOT_ACCEPTABLE,
      )
    }
    if (dataIsExpired) {
      throw new HttpException(
        TelegramErrors.DATA_EXPIRED,
        HttpStatus.FORBIDDEN,
      )
    }

    const telegramDataSourceForCreate: TTelegramDataCreate = {
      id: data.id,
      firstName: data.firstName,
      username: data.username,
      photoUrl: data.photoUrl,
      role: user_roles.USER_VERIFY,
      lastVisited: getCurrentDate(),
    }
    return this.db
      .user
      .create({ data: telegramDataSourceForCreate })
  }
}
