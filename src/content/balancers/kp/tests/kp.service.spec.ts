import { Test, TestingModule } from '@nestjs/testing'
import { KpService } from '../kp.service'

describe('KpService', () => {
  let service: KpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KpService]
    }).compile()

    service = module.get<KpService>(KpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
