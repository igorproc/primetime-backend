// Node Deps
import { Test, TestingModule } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
// Test Deps
import Env from '@/config/modules/env'
import { AuthService } from '@/auth/auth.service'
import { TelegramModule } from '@/auth/telegram/telegram.module'
import { DeviceModule } from '@/device/device.module'
import { UserModule } from '@/user/user.module'
import { DbService } from '@/db/db.service'
// Errors
// mock
import { mockDevice, mockUser } from '@/auth/tests/mock'
// TODO: Разобраться с мокированием prisma
const mockPrisma = {
  user: {
    create: jest.fn().mockResolvedValue({ mockUser })
  },
  device: {
    create: jest.fn().mockResolvedValue({ mockDevice })
  },
  token: {
    updateMany: jest.fn()
  }
}

describe('[Auth] Main Service', () => {
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Env(),
        JwtModule.register({
          secret: 'mock-unit-auth',
          signOptions: { expiresIn: '30m' }
        }),
        DeviceModule,
        UserModule,
        TelegramModule
      ],
      providers: [
        AuthService,
        {
          provide: DbService,
          useValue: mockPrisma
        }
      ]
    })
      .compile()

    authService = module.get<AuthService>(AuthService)
  })

  it('should be defined', async () => {
    expect(authService).toBeDefined()
  })

  // it('create tokens', async () => {
  //   tokens = await authService.createTokens(user, clientId.clientId)
  //   expect(tokens)
  //     .toBeDefined()
  // })
  //
  // it('update tokens', async () => {
  //   tokens = await authService.revokeTokens(tokens.refreshToken)
  //   expect(tokens)
  //     .toBeDefined()
  // })
  //
  // it('create tokens with uncreated client_id', async () => {
  //   try {
  //     await authService.createTokens(user, faker.string.uuid())
  //     expect(true).toBe(false)
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(HttpException)
  //     expect(error.getResponse()).toEqual(AuthErrors.BAD_CLIENT_ID)
  //   }
  // })
  //
  // it('create tokens with bad client_id', async () => {
  //   try {
  //     await authService.createTokens(user, faker.person.firstName('female'))
  //     expect(true).toBe(false)
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(HttpException)
  //     expect(error.getResponse()).toEqual(AuthErrors.NO_CLIENT_ID)
  //   }
  // })
  //
  // it('try update tokens with withdrawn tokens', async () => {
  //   try {
  //     await dbService.token.updateMany({
  //       where: { accessToken: tokens.accessToken, refreshToken: tokens.accessToken },
  //       data: { revoked: false }
  //     })
  //
  //     await authService.revokeTokens(tokens.refreshToken)
  //     expect(true).toBe(false)
  //   } catch (error) {
  //     const errorResponse = error.getResponse()
  //     expect(error).toBeInstanceOf(HttpException)
  //     expect(errorResponse).toEqual(AuthErrors.LOGOUT)
  //   }
  // })
})
