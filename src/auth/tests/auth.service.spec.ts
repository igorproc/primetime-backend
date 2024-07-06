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
})
