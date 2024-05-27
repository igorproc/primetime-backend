// Types & Interfaces
import type { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'

export enum EAuthWays {
  'telegram' = 'TG',
}

// to extends auth input
export type TAuthInput = (TelegramAuthInput)

type TAuthUserResponse = {
  id: number
}

export interface IAuthServiceProvider {
  authUser: (...args: unknown[]) => Promise<TAuthUserResponse>
}
