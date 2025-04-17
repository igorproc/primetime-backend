// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { compareSync } from 'bcrypt'
// Other Services
import { DbService } from '@/db/db.service'
// Utils
import { encryptWithSalt, generateHash } from '@utils/crypt'
// Errors
import { EmailErrors } from '@/auth/auth-ways/email/email.errors'
// Const
import { AVAILABLE_EMAIL_DOMAIN_LIST } from '@/auth/auth-ways/email/email.const'
// Types
import type { IAuthServiceProvider } from '@/auth/auth.types'
import type { TSuccessEmailAuthCheck } from '@/auth/auth-ways/email/email.types'
import type { TEmailAuthInput } from '@/auth/auth-ways/email/dto/validate.dto'

enum EUniqueFields {
  EMAIL = 'email',
  USERNAME = 'username',
}

@Injectable()
export class EmailAuthService implements IAuthServiceProvider {
  constructor(
    private readonly db: DbService,
  ) {}

  private checkEmailFromTrustedSource(email: string) {
    const REGEXP = /@.*$/gi
    const emailDomain = email.match(REGEXP)[0]

    if (!AVAILABLE_EMAIL_DOMAIN_LIST.includes(emailDomain)) {
      throw new HttpException(EmailErrors.FAKE_EMAIL, HttpStatus.BAD_REQUEST)
    }
    return true
  }

  private async dbCheckIsUniqueField(type: EUniqueFields, value: string) {
    try {
      const whereFields = { [type]: value }

      return await this
        .db
        .user
        .findFirst({
          where: whereFields,
          select: { id: true },
        })
    } catch (error) {
      throw new HttpException(
        EmailErrors.INTERNAL_SERVER,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  protected async checkIsOldUser(payload: TEmailAuthInput) {
    const user = await this
      .db
      .user
      .findUnique({
        where: { email: payload.email },
        select: { password: true },
      })
    if (!user) {
      return false
    }

    const passwordsIsPair = compareSync(payload.password, user.password)
    if (!passwordsIsPair) {
      throw new HttpException(EmailErrors.BAD_PASSWORD, HttpStatus.BAD_REQUEST)
    }
    return Boolean(passwordsIsPair)
  }

  protected async authorizeUser(data: TEmailAuthInput) {
    if (!data.username || !data.displayName || !this.checkEmailFromTrustedSource(data.email)) {
      throw new HttpException(EmailErrors.BAD_PAYLOAD, HttpStatus.BAD_REQUEST)
    }

    const [email, username] = await Promise.all([
      this.dbCheckIsUniqueField(EUniqueFields.EMAIL, data.email),
      this.dbCheckIsUniqueField(EUniqueFields.USERNAME, data.username),
    ])

    if (email) {
      throw new HttpException(EmailErrors.UNIQUE_FIELDS, HttpStatus.BAD_REQUEST)
    }

    if (username) {
      data.username = `${generateHash()}-${data.username}`
    }

    const hashedPassword = encryptWithSalt(10, data.password)
    return this
      .db
      .user
      .create({
        data: {
          email: data.email,
          password: hashedPassword,
          username: data.username,
          displayName: data.displayName,
          photoUrl: data?.photoUrl || null,
        },
        select: {
          username: true,
          email: true,
          displayName: true,
          photoUrl: true,
        },
      })
  }

  public async checkAuth(data: TEmailAuthInput): Promise<TSuccessEmailAuthCheck> {
    const isOldUser = await this.checkIsOldUser(data)
    if (isOldUser) {
      return {
        username: data.username,
        email: data.email,
        displayName: data.displayName,
        photoUrl: data?.photoUrl || null,
      }
    }

    const userData = await this.authorizeUser(data)
    return {
      username: userData.username,
      email: userData.email,
      displayName: userData.displayName,
      photoUrl: userData?.photoUrl || null,
    }
  }
}
