// Node Deps
import {
  Body,
  Controller,
  Post,
  Query
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiExtraModels,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger'
// Current Module Deps
import { AuthService } from './auth.service'
// Validators
import { AuthInputSchema, LogoutInputSchema, RevokeInputSchema } from '@/auth/dto/validate.dto'
// Swagger Schemas
import { SuccessAuthSchema, SuccessAuthTokens, SuccessLogoutSchema } from '@/auth/dto/swagger.dto'
import { DefaultErrorSchema } from '@/global.dto'
// Errors
import { AuthErrors } from '@/auth/auth.errors'

@ApiTags('Auth')
@Controller({ path: 'api/auth' })
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiOperation({ description: 'User login by others services' })
  @ApiBody({ type: AuthInputSchema, required: true })
  @ApiExtraModels(DefaultErrorSchema)
  @ApiOkResponse({ type: SuccessAuthSchema })
  @ApiResponse({
    status: 406,
    schema: { default: new DefaultErrorSchema(AuthErrors.NO_CLIENT_ID) }
  })
  @ApiResponse({
    status: 403,
    schema: { default: new DefaultErrorSchema(AuthErrors.BAD_CLIENT_ID) }
  })
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(AuthErrors.INTERNAL_ERROR) }
  })
  async login(
    @Body() payload: AuthInputSchema
  ) {
    return await this.authService.auth(payload.clientId, payload.type, payload.payload)
  }

  @Post('revoke')
  @ApiOperation({ description: 'Refresh tokens pair' })
  @ApiQuery({ name: 'token', required: true, description: 'refresh token' })
  @ApiOkResponse({ type: SuccessAuthTokens })
  @ApiResponse({
    status: 401,
    schema: { default: new DefaultErrorSchema(AuthErrors.LOGOUT) }
  })
  @ApiResponse({
    status: 403,
    schema: { default: new DefaultErrorSchema(AuthErrors.BAD_JWT) }
  })
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(AuthErrors.INTERNAL_ERROR) }
  })
  async revoke(
    @Query() query: RevokeInputSchema
  ): Promise<SuccessAuthTokens> {
    return await this.authService.revokeTokens(query.token)
  }

  @Post('logout')
  @ApiOperation({ description: 'Logout user' })
  @ApiQuery({ name: 'token', required: true, description: 'refresh token' })
  @ApiResponse({
    status: 500,
    schema: { default: new DefaultErrorSchema(AuthErrors.INTERNAL_ERROR) }
  })
  @ApiOkResponse({ type: SuccessLogoutSchema })
  async logout(
    @Query() query: LogoutInputSchema
  ) {
    return await this.authService.logout(query.token)
  }
}
