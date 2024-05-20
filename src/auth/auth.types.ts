import { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'
import { VkAuthInput } from '@/auth/vk/dto/validator.dto'

export enum EAuthWays {
  'telegram' = 'TG',
  'vkontakte' = 'VK',
}

// to extends auth input
export type TAuthInput = (TelegramAuthInput | VkAuthInput)

export interface IAuthServiceProvider<T1, P1> {
  authUser: (payload: T1) => Promise<P1>
}
