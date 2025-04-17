// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { env } from 'process'
// Other Services
import { DbService } from '@/db/db.service'
// Current Service Deps
import { TelegramAuthService } from '@/auth/auth-ways/telegram/telegramAuth.service'
import { EmailAuthService } from '@/auth/auth-ways/email/email.service'
// Types
import {
  EAuthWays,
  type IAuthServiceProvider,
  type TAuthInput,
  type TSuccessCheckAuth,
} from '@/auth/auth.types'

type TFallbackService = IAuthServiceProvider & { httpException: unknown }
type TServiceStatuses = { [key in EAuthWays]: string }

// Expand if add new auth service
type TAvailableServices = (TelegramAuthService | EmailAuthService | TFallbackService)
type TServiceAdapter = { [key in EAuthWays]: TAvailableServices | TFallbackService }

type TCheckAuthReturn = {
  user: TSuccessCheckAuth
}

@Injectable()
export class AuthProviderService {
  private readonly serviceAdapterByType: TServiceAdapter
  private readonly serviceDbSettingsMap: TServiceStatuses

  constructor(
    private readonly db: DbService,
    private readonly telegramAuth: TelegramAuthService,
    private readonly emailAuth: EmailAuthService,
  ) {
    this.serviceAdapterByType = { [EAuthWays.telegram]: telegramAuth, [EAuthWays.email]: emailAuth }
    this.serviceDbSettingsMap = { [EAuthWays.telegram]: 'telegram_auth_on', [EAuthWays.email]: 'email_auth_on' }
  }

  protected fallBackClassExemplar: TFallbackService = {
    httpException: new HttpException({ error: 501 }, HttpStatus.BAD_REQUEST),

    async checkAuth() {
      throw this.httpException
    }
  }

  protected getCurrentServiceByType(type: keyof typeof EAuthWays): IAuthServiceProvider {
    const valueFromEnum = EAuthWays[type]

    return this.serviceAdapterByType[valueFromEnum] || this.fallBackClassExemplar
  }

  public async checkAuth(type: keyof typeof EAuthWays, data: TAuthInput): Promise<TCheckAuthReturn> {
    const userData = await this
      .getCurrentServiceByType(type)
      .checkAuth(data)

    return { user: userData }
  }
}
