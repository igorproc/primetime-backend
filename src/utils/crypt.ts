// Node Deps
import { UnauthorizedException } from '@nestjs/common'
import { createHmac, createHash } from 'crypto'
import { hashSync } from 'bcrypt'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
// Utils
import { getCurrentTimestamp } from '@utils/time'
// Errors
import { AuthErrors } from '@/auth/auth.errors'

export function cryptStringToSha256ByKey(message: string, key: string): string {
  return createHmac('sha256', key, { encoding: 'hex' })
    .update(message)
    .digest('hex')
}

export function cryptStringToSha256(message: string): string {
  return createHash('sha256')
    .update(message)
    .digest('hex')
}

export function encryptWithoutSalt(data: string | Buffer): string {
  return hashSync(data, 10)
}

export function getJWTPayload<T>(token: string): T & JwtPayload {
  const data = jwtDecode<T & JwtPayload>(token)
  const timestamp = getCurrentTimestamp()

  if (timestamp > data.exp) {
    throw new UnauthorizedException(AuthErrors.LOGOUT)
  }

  return data
}
