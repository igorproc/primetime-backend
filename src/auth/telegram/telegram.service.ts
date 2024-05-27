// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { env } from 'process'
// Other Service Deps
import { DbService } from '@/db/db.service'
// Errors
import { TelegramErrors } from '@/auth/telegram/telegram.errors'
// Utils
import { cryptStringToSha256, cryptStringToSha256ByKey } from '@utils/crypt'
import { getCurrentTime } from '@utils/time'
// Constants
import { MAX_PAYLOAD_LIFE } from '@/auth/telegram/telegram.const'
// Types & Interfaces
import type { userTelegramData } from '@prisma/client'
import type { IAuthServiceProvider } from '@/auth/auth.types'
import type { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'
import { ETelegramHmacTokenFields } from '@/auth/telegram/telegram.types'

type TTelegramDataCreate = Omit<userTelegramData, 'id' | 'createdAt' | 'updatedAt'>
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

  async authUser(data: TelegramAuthInput, userId: number) {
    const dataIsValid = this.validateTelegramData(data)
    const currentTime = getCurrentTime()
    const dataIsExpired = currentTime - data.authDate > MAX_PAYLOAD_LIFE
    console.log(dataIsExpired, currentTime, data.authDate)

    if (!dataIsValid) {
      throw new HttpException(
        TelegramErrors.BAD_PAYLOAD,
        HttpStatus.BAD_GATEWAY,
      )
    }
    if (dataIsExpired) {
      throw new HttpException(
        TelegramErrors.DATA_EXPIRED,
        HttpStatus.GATEWAY_TIMEOUT,
      )
    }

    const telegramDataSourceForCreate: TTelegramDataCreate = {
      userId,
      telegramId: data.id,
      firstName: data.firstName,
      username: data.username,
      photoUrl: data.photoUrl,
    }
    const telegramData = await this.db
      .userTelegramData
      .create({ data: telegramDataSourceForCreate })

    return { id: telegramData.id }
  }
}
