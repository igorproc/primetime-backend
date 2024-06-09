// Node Deps
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
// Other Services
import { DbService } from '@/db/db.service'
import { JwtService } from '@nestjs/jwt'
import { DeviceService } from '@/device/device.service'
import { UserService } from '@/user/user.service'
import { TelegramService } from '@/auth/telegram/telegram.service'
// Utils
import { addTimeToCurrentDate, getCurrentDate } from '@utils/time'
import { cryptStringToSha256 } from '@utils/crypt'
import { isValidUUID } from '@utils/validate'
// Errors
import { AuthErrors } from '@/auth/auth.errors'
// Types & Interfaces
import { EAuthWays, IAuthServiceProvider, type TAuthInput } from '@/auth/auth.types'
import { SuccessAuthSchema, SuccessAuthUser } from '@/auth/dto/swagger.dto'
import { EUserRoles } from '@/global.types'
import { checkErrorIsResponseError } from '@utils/error'

// Expand if add new auth service
type TAvailableServices = TelegramService
type TServiceAdapter = { [key in EAuthWays]: TAvailableServices }

export type TAuthTokensPair = {
  accessToken: string,
  refreshToken: string,
}

type TAccessTokenPayload = {
  id: number,
  clientId: string,
  role: EUserRoles
}

@Injectable()
export class AuthService {
  private readonly serviceAdapterByType: TServiceAdapter

  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService,
    private readonly deviceService: DeviceService,
    private readonly userService: UserService,
    private readonly telegramAuthService: TelegramService
  ) {
    this.serviceAdapterByType = {
      TG: telegramAuthService
    }
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

  protected fallBackClassExemplar: IAuthServiceProvider & { httpException: unknown } = {
    httpException: new HttpException({ error: 501 }, HttpStatus.BAD_REQUEST),

    async authUser() {
      throw this.httpException
    }
  }

  protected getCurrentServiceByType(type: keyof typeof EAuthWays): IAuthServiceProvider {
    const valueFromEnum = EAuthWays[type]

    return this.serviceAdapterByType[valueFromEnum] || this.fallBackClassExemplar
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
    if (!isValidUUID(clientId)) {
      throw new HttpException(
        AuthErrors.NO_CLIENT_ID,
        HttpStatus.NOT_ACCEPTABLE
      )
    }
    if (!await this.deviceService.getByUUID(clientId)) {
      throw new HttpException(
        AuthErrors.BAD_CLIENT_ID,
        HttpStatus.FORBIDDEN
      )
    }

    await this.deleteTokensByIds(data.id, clientId)
    const refreshTokenExpiresDate = addTimeToCurrentDate(180, 'days').getTime() / 1000
    const accessTokenCode = refreshTokenExpiresDate + Math.random().toString(32)

    const accessToken = this.jwtService.sign(
      { expires: cryptStringToSha256(accessTokenCode), role: data.role },
      { expiresIn: '15m' }
    )
    const refreshToken = this.jwtService.sign(
      { id: data.id, clientId: clientId, role: data.role },
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
          clientId
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
    await this.deviceService.setUserIdByClientId(data.id, clientId)
    return tokens
  }

  public async auth(clientId: string, type: keyof typeof EAuthWays, data: TAuthInput): Promise<SuccessAuthSchema> {
    let userData = await this.userService.getUserById(data.id)
    if (userData) {
      const tokens = await this.createTokens(userData, clientId)
      return { user: userData, tokens }
    }

    userData = await this
      .getCurrentServiceByType(type)
      .authUser(data)
    const tokens = await this.createTokens(userData, clientId)
    return { user: userData, tokens }
  }

  public async revokeTokens(refreshToken: string): Promise<TAuthTokensPair> {
    const currentDate = getCurrentDate()
    const jwtDecode = await this.decodeJWT<TAccessTokenPayload>(
      'refresh',
      refreshToken
    )

    const tokensData = await this.db
      .token
      .findFirst({
        where: { refreshToken: refreshToken }
      })
    const tokenIsExpired = tokensData.expiresAt.getTime() - currentDate.getTime() < 0
    if (tokensData.revoked || tokenIsExpired) {
      this.deleteTokensByRefreshToken(refreshToken)
      throw new HttpException(
        AuthErrors.LOGOUT,
        HttpStatus.UNAUTHORIZED
      )
    }

    const userData = await this.db.user.findUnique({
      where: { id: jwtDecode.id }
    })
    return await this.createTokens(userData, jwtDecode.clientId)
  }

  public async logout(refreshToken: string) {
    try {
      const jwtData: TAccessTokenPayload = await this.decodeJWT('refresh', refreshToken)
      await this.db.device.updateMany({
        where: { userId: jwtData.id },
        data: { userId: null }
      })
      await this.db.token.deleteMany({
        where: { refreshToken }
      })

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
