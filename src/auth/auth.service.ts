// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
// Other Services
import { DbService } from '@/db/db.service'
import { JwtService } from '@nestjs/jwt'
// Child Services
import { AuthProviderService } from '@/auth/providers/auth.provider'
// Utils
import { addTimeToCurrentDate, getCurrentDate } from '@utils/time'
import { cryptStringToSha256 } from '@utils/crypt'
import { isValidUUID } from '@utils/validate'
import { checkErrorIsResponseError } from '@utils/error'
// Errors
import { AuthErrors } from '@/auth/auth.errors'
// Swagger Schemas
import type { SuccessAuthSchema, SuccessAuthUser } from '@/auth/dto/swagger.dto'
import {
  type TAuthInput,
  type TAuthTokensPair,
  type IRefreshTokenPayload,
  EAuthWays,
  type TSuccessCheckAuth,
} from '@/auth/auth.types'

type TTokensUserSelect = {
  id: boolean,
  role: boolean,
  username: boolean,
  displayName: boolean,
  photoUrl: boolean,
  blocking: {
    select: { blockingStatus: boolean, blockingReason: boolean, blockedEnd: boolean }
  },
}

@Injectable()
export class AuthService {
  private readonly tokensUserSelect: TTokensUserSelect

  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService,
    private readonly authProvider: AuthProviderService,
  ) {
    this.tokensUserSelect = {
      id: true,
      role: true,
      username: true,
      displayName: true,
      photoUrl: true,
      blocking: {
        select: { blockingStatus: true, blockingReason: true, blockedEnd: true }
      },
    }
  }

  private dbActions = {
    getDeviceByClientId: async (clientId: string) => {
      if (!isValidUUID(clientId)) {
        throw new HttpException(
          AuthErrors.NO_CLIENT_ID,
          HttpStatus.NOT_ACCEPTABLE
        )
      }

      return this.db
        .device
        .findUnique({
          where: { clientId }
        })
    },

    setUserIdByClientId: async (userId: number, clientId: string) => {
      return this.db
        .device
        .update({
          where: { clientId },
          data: { userId }
        })
    },

    removeUserFromClientId: async (clientId: string) => {
      return this.db
        .device
        .update({
          where: { clientId },
          data: { userId: null }
        })
    },
  }

  private compileLoginUpdateData(userPayload: TSuccessCheckAuth) {
    const uniqueFields = ['username', 'password']
    const result = { lastVisited: getCurrentDate() }

    for (const [key, value] of Object.entries(userPayload)) {
      if (uniqueFields.includes(key)) {
        continue
      }

      result[key] = value
    }
    return result
  }

  private async validateToken(tokenType: 'access' | 'refresh', token: string): Promise<boolean> {
    try {
      const queryPayload: { accessToken?: string, refreshToken?: string } = {}
      switch (tokenType) {
        case 'access':
          queryPayload.accessToken = token
          break
        case 'refresh':
          queryPayload.refreshToken = token
          break
        default:
          queryPayload.accessToken = null
          queryPayload.refreshToken = null
          break
      }

      await this.db.token.findFirstOrThrow({ where: queryPayload })
      return !!this.jwtService.verify(token)
    } catch {
      throw new HttpException(
        AuthErrors.BAD_JWT,
        HttpStatus.NOT_ACCEPTABLE
      )
    }
  }

  private async decodeJWT<T>(tokenType: 'access' | 'refresh', token: string): Promise<T> {
    await this.validateToken(tokenType, token)
    return this.jwtService.decode(token)
  }

  protected async deleteTokensByRefreshToken(refreshToken: string) {
    return this.db
      .token
      .deleteMany({
        where: { refreshToken }
      })
  }

  protected async deleteTokensByIds(userId: number, clientId: string) {
    return this.db
      .token
      .deleteMany({
        where: { userId, clientId }
      })
  }

  public async createTokens(data: SuccessAuthUser, clientId: string): Promise<TAuthTokensPair> {
    if (!await this.dbActions.getDeviceByClientId(clientId)) {
      throw new HttpException(
        AuthErrors.BAD_CLIENT_ID,
        HttpStatus.FORBIDDEN
      )
    }

    await this.deleteTokensByIds(data.id, clientId)
    const refreshTokenExpiresDate = addTimeToCurrentDate(180, 'days').getTime() / 1000
    const accessTokenCode = refreshTokenExpiresDate + Math.random().toString(32)

    const accessToken = this.jwtService.sign(
      {
        expires: cryptStringToSha256(accessTokenCode),
        ...data,
      },
      { expiresIn: '15m' }
    )

    const refreshToken = this.jwtService.sign(
      { id: data.id, clientId: clientId },
      { expiresIn: '180d' }
    )

    const tokens = this.db
      .token
      .create({
        data: {
          accessToken,
          refreshToken,
          expiresAt: addTimeToCurrentDate(6, 'months'),
          userId: data.id,
          clientId,
        },
        select: {
          accessToken: true,
          refreshToken: true
        }
      })

    if (!tokens) {
      throw new HttpException(
        AuthErrors.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    await this.dbActions.setUserIdByClientId(data.id, clientId)
    return tokens
  }

  public async auth(clientId: string, type: keyof typeof EAuthWays, data: TAuthInput) {
    const getWhereValues = (user: TSuccessCheckAuth) => {
      if ('email' in user) {
        return { email: user.email }
      }

      return { telegramId: user.telegramId }
    }

    const userWithSuccessAuthCheck = await this
      .authProvider
      .checkAuth(type, data)

    const user = await this
      .db
      .user
      .upsert({
        where: getWhereValues(userWithSuccessAuthCheck.user),
        create: userWithSuccessAuthCheck.user,
        update: this.compileLoginUpdateData(userWithSuccessAuthCheck.user),
        select: this.tokensUserSelect,
      })

    const blockingData = user.blocking
    delete user.blocking

    const tokens = await this.createTokens(user, clientId)
    return { user, tokens, blocking: blockingData }
  }

  public async revokeTokens(refreshToken: string): Promise<TAuthTokensPair> {
    const currentDate = getCurrentDate()
    const jwtDecode = await this.decodeJWT<IRefreshTokenPayload>(
      'refresh',
      refreshToken
    )

    const tokensData = await this.db
      .token
      .findFirst({
        where: { refreshToken: refreshToken },
        select: {
          expiresAt: true,
          revoked: true,
          user: { select: this.tokensUserSelect },
        },
      })
    const tokenIsExpired = tokensData.expiresAt.getTime() - currentDate.getTime() < 0

    if (tokensData.revoked || tokenIsExpired) {
      this.deleteTokensByRefreshToken(refreshToken)
      throw new HttpException(
        AuthErrors.LOGOUT,
        HttpStatus.UNAUTHORIZED
      )
    }

    return await this.createTokens(tokensData.user, jwtDecode.clientId)
  }

  public async logout(refreshToken: string) {
    try {
      const jwtData: IRefreshTokenPayload = await this.decodeJWT('refresh', refreshToken)
      await Promise.all([
        this.dbActions.removeUserFromClientId(jwtData.clientId),
        this.deleteTokensByRefreshToken(refreshToken),
      ])

      return { successLogout: true }
    } catch (error) {
      if (checkErrorIsResponseError(error.message)) {
        throw error
      }

      throw new HttpException(
        AuthErrors.INTERNAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
