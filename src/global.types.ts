import type { Request as DefaultRequest } from 'express'
import { user, device_platforms, user_roles, device } from '@prisma/client'

export enum EAvailableCookies {
  'clientId' = 'client-id'
}

export interface Request extends DefaultRequest {
  cookies: Record<keyof typeof EAvailableCookies, typeof EAvailableCookies>
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
