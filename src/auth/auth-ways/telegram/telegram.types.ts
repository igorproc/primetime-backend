// Types
import { user_roles } from '@prisma/client'

export enum ETelegramHmacTokenFields {
  'id' = 'id',
  'firstName' = 'first_name',
  'username' = 'username',
  'photoUrl' = 'photo_url',
  'authDate' = 'auth_date',
}

export type TSuccessTelegramAuthCheck = {
  telegramId: number,
  displayName: string,
  username: string,
  photoUrl: string,
  role: user_roles,
  lastVisited: Date,
}
