import type { Request as DefaultRequest } from 'express'
import {
  type user,
  type device,
  device_platforms,
  user_roles,
} from '@prisma/client'

export enum EAvailableCookies {
  'client-id',
  'Authorization',
}

export interface Request extends DefaultRequest {
  cookies: Record<keyof typeof EAvailableCookies, keyof typeof EAvailableCookies>,
}

export type TResponseError = {
  code: string,
  message: string,
}

// Prisma
export type EUserRoles = user_roles
export type EDevicePlatforms = device_platforms

export type TUserModel = user
export type TDeviceModel = device
