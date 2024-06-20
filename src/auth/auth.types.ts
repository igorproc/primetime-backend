// Types & Interfaces
import type { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'
import { EUserRoles, TUserModel } from '@/global.types'

export enum EAuthWays {
  'telegram' = 'TG',
}

// to extends auth input
export type TAuthInput = (TelegramAuthInput)
type TSuccessAuth = Omit<TUserModel, 'createdAt' | 'updatedAt'>

export interface IAuthServiceProvider {
  authUser: (...args: unknown[]) => Promise<TSuccessAuth>
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
