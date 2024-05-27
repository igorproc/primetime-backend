// Node Deps
import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'
// Current Module Deps
import { AuthService } from './auth.service'
// Validators
import { AuthInputSchema } from '@/auth/dto/validate.dto'
// Swagger Schemas
import { SuccessAuthSchema } from '@/auth/dto/swagger.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiOperation({ description: 'User login by others services' })
  @ApiResponse({
    status: 200,
    type: SuccessAuthSchema,
  })
  @ApiBody({ type: AuthInputSchema, required: true })
  async login(
    @Body() data: AuthInputSchema,
  ) {
    return await this.authService.auth(data.type, data.payload)
  }
}
