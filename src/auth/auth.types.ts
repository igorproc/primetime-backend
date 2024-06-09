// Types & Interfaces
import type { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'
import type { user as TUserModel } from '@prisma/client'

export enum EAuthWays {
  'telegram' = 'TG',
}

// to extends auth input
export type TAuthInput = (TelegramAuthInput)
type TSuccessAuth = Omit<TUserModel, 'createdAt' | 'updatedAt'>

export interface IAuthServiceProvider {
  authUser: (...args: unknown[]) => Promise<TSuccessAuth>
}
