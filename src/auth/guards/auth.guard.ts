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
import type { IAccessTokenPayload } from '@/auth/auth.types'
import { user_roles as EUserRoles } from '@prisma/client'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly roleConditionMap: Record<string, IAccessTokenPayload['role'][]>

  constructor(
    private readonly db: DbService,
  ) {
    this.roleConditionMap = {
      'user': [EUserRoles.USER_DEFAULT, EUserRoles.USER_VERIFY],
      'admin': [EUserRoles.ADMIN, EUserRoles.DEV_VERIFY],
      'qa': [EUserRoles.QA_DEFAULT, EUserRoles.QA_VERIFY, EUserRoles.DEV_POOL],
    }
  }

  private getTokenFromRequest(request: Request) {
    if (request.cookies['client-id']) {
      return request.cookies['client-id']
    }

    if (!request.headers.authorization) {
      throw new UnauthorizedException(AuthErrors.LOGOUT)
    }
    return request.headers.authorization
  }

  private checkAccessToken(token = ''): boolean {
    try {
      if (!isJWT(token)) {
        throw Error('Is not a JWT!')
      }

      return true
    } catch {
      throw new UnauthorizedException(AuthErrors.BAD_JWT)
    }
  }

  private getRoleFromMap(role: IAccessTokenPayload['role']): string | null {
    for (const [key, value] of Object.entries(this.roleConditionMap)) {
      if (value.includes(role)) {
        return key
      }
    }

    return null
  }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const token = this
      .getTokenFromRequest(request)
      .replace('Bearer ', '')
    this.checkAccessToken(token)

    const currentDate = getCurrentDate()
    const tokenPayload = getJWTPayload<IAccessTokenPayload>(token)
    const tokenData = await this.db
      .token
      .findFirst({
        where: { accessToken: token },
        select: { revoked: true, expiresAt: true }
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
      .user = { role: this.getRoleFromMap(tokenPayload.role) }
    return true
  }
}
