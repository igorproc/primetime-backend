import { Test, TestingModule } from '@nestjs/testing';
import { BalancersService } from '../balancers.service';

describe('BalancersService', () => {
  let service: BalancersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalancersService],
    }).compile();

    service = module.get<BalancersService>(BalancersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
