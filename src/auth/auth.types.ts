// Types & Interfaces
import { EUserRoles } from '@/global.types'
import type { TelegramAuthInput } from '@/auth/auth-ways/telegram/dto/validate.dto'
import type { TSuccessEmailAuthCheck } from '@/auth/auth-ways/email/email.types'
import type { TSuccessTelegramAuthCheck } from '@/auth/auth-ways/telegram/telegram.types'

export enum EAuthWays {
  'telegram' = 'TG',
  'email' = 'EMAIL'
}

// to extends auth input
export type TAuthInput = (TelegramAuthInput | TSuccessEmailAuthCheck)
export type TSuccessCheckAuth = (TSuccessTelegramAuthCheck | TSuccessEmailAuthCheck)

export interface IAuthServiceProvider {
  checkAuth: (...args: unknown[]) => Promise<TSuccessCheckAuth>
}

export interface IAccessTokenPayload {
  expires: string,
  role: EUserRoles,
}

export interface IRefreshTokenPayload {
  id: number,
  clientId: string,
  role: EUserRoles
}

export type TAuthTokensPair = {
  accessToken: string,
  refreshToken: string,
}

export enum EUniqueFindFields {
  EMAIL = 'email',
  USERNAME = 'username',
}
