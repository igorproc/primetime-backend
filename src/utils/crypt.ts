// Node Deps
import { createHmac, createHash } from 'crypto'
import { hashSync } from 'bcrypt'

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
