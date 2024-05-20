// Node Deps
import { Body, Controller, Post } from '@nestjs/common'
// Current Module Deps
import { AuthService } from './auth.service'
// Types & Interfaces
import type { TAuthInput } from '@/auth/auth.types'
import { EAuthWays } from '@/auth/auth.types'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(
    @Body('type') type: keyof typeof EAuthWays,
    @Body('payload') loginData: TAuthInput,
  ) {
    return await this.authService.auth(type, loginData)
  }
}
