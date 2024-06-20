import { device_platforms } from '@prisma/client'

export enum EInputPlatforms {
  windows,
  linux,
  android,
  iphone,
  ipad,
  macintosh,
}

type TAvailablePlatforms = {
  [key in (keyof typeof EInputPlatforms)]: device_platforms
}

export const availablePlatforms: TAvailablePlatforms = {
  'windows': device_platforms.WINDOWS,
  'linux': device_platforms.LINUX,
  'android': device_platforms.ANDROID,
  'iphone': device_platforms.IPHONE,
  'ipad': device_platforms.IPAD,
  'macintosh': device_platforms.MACINTOSH,
}
