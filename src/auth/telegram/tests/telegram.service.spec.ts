// Node Deps
import { Test, TestingModule } from '@nestjs/testing'
import { TelegramService } from '../telegram.service'
import { HttpException } from '@nestjs/common'
// Service Deps
import { TelegramErrors } from '@/auth/telegram/telegram.errors'
import { DbModule } from '@/db/db.module'
// Utils
import { getDataFromJson } from '@@/test/utis/data.util'
// Types & Interfaces
import type { TelegramAuthInput } from '@/auth/telegram/dto/validate.dto'
import Env from '@/config/modules/env'

type JSONData = {
  hashCheck: TelegramAuthInput,
  hashBadPayload: TelegramAuthInput,
}

describe('[Telegram] Main Service', () => {
  const data = getDataFromJson<JSONData>('telegram.json')
  let service: TelegramService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Env(), DbModule],
      providers: [TelegramService]
    }).compile()

    service = module.get<TelegramService>(TelegramService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('check hash function by bad payload', async () => {
    try {
      await service.authUser(data.hashBadPayload)
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.getResponse()).toEqual(TelegramErrors.BAD_PAYLOAD)
    }
  })

  it('check hash function by expired data', async () => {
    try {
      await service.authUser(data.hashCheck)
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.getResponse()).toEqual(TelegramErrors.DATA_EXPIRED)
    }
  })
})
