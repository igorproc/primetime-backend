import { Injectable } from '@nestjs/common'
import type { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'
import { IAuthServiceProvider } from '@/auth/auth.types'

@Injectable()
export class TelegramService implements IAuthServiceProvider<
  TelegramAuthInput,
  TelegramAuthInput
> {
  async authUser (data: TelegramAuthInput) {
    return data
  }
}
