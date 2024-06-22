// Node Deps
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { isJWT } from 'class-validator'
// Services
import { DbService } from '@/db/db.service'
// Utils
import { getCurrentDate } from '@utils/time'
import { getJWTPayload } from '@utils/crypt'
// Errors
import { AuthErrors } from '@/auth/auth.errors'
// Types & Interfaces
import type { Request } from '@/global.types'
import { IAccessTokenPayload } from '@/auth/auth.types'

enum RoleConditions {
  'USER_VERIFY'= 'user',
  'ADMIN' = 'admin',
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly db: DbService,
  ) {}

  private checkAccessToken(token = ''): boolean {
    try {
      if (!isJWT(token)) {
        throw new Error('Is not a JWT!')
      }

      return true
    } catch {
      throw new UnauthorizedException(AuthErrors.BAD_JWT)
    }
  }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    let token = request.cookies.Authorization

    if (!token) {
      if (!request.headers.authorization) {
        throw new UnauthorizedException(AuthErrors.LOGOUT)
      }

      token = request.headers.authorization
    }
    token = token.replace('Bearer ', '')
    this.checkAccessToken(token)

    const currentDate = getCurrentDate()
    const tokenPayload = getJWTPayload<IAccessTokenPayload>(token)
    const tokenData = await this.db
      .token
      .findFirst({
        where: { accessToken: token },
      })

    if (!tokenData ||
      tokenData.revoked ||
      tokenData.expiresAt.getTime() - currentDate.getTime() < 0
    ) {
      throw new UnauthorizedException(AuthErrors.LOGOUT)
    }

    context
      .switchToHttp()
      .getRequest()
      .user = { role: RoleConditions[tokenPayload.role] }
    return true
  }
}
