// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
// Other Services
import { TelegramService } from '@/auth/telegram/telegram.service'
import { VkService } from '@/auth/vk/vk.service'
// Types & Interfaces
import { EAuthWays, type TAuthInput } from '@/auth/auth.types'
import { type VkAuthInput } from '@/auth/vk/dto/validator.dto'

type TAvailableServices = TelegramService | VkService
type TServiceAdapter = { [key in EAuthWays]: TAvailableServices }

@Injectable()
export class AuthService {
  private readonly serviceAdapterByType: TServiceAdapter

  constructor(
    private readonly telegramAuthService: TelegramService,
    private readonly vkAuthService: VkService,
  ) {
    this.serviceAdapterByType = {
      TG: telegramAuthService,
      VK: vkAuthService,
    }
  }

  protected getCurrentServiceByType (type: keyof typeof EAuthWays): TAvailableServices {
    const valueFromEnum = EAuthWays[type]
    const fallbackClassExemplar = {
      httpException: new HttpException({ error: 501 }, HttpStatus.BAD_REQUEST),

      async authUser() {
        throw this.httpException
      }
    }

    return this.serviceAdapterByType[valueFromEnum] || fallbackClassExemplar
  }

  async auth (type: keyof typeof EAuthWays, data: TAuthInput) {
    return await this
      .getCurrentServiceByType(type)
      .authUser(data)
  }
}
