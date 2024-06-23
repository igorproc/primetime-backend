import { Test, TestingModule } from '@nestjs/testing';
import { KpPayService } from '../kp-pay.service';

describe('KpPayService', () => {
  let service: KpPayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KpPayService],
    }).compile();

    service = module.get<KpPayService>(KpPayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
