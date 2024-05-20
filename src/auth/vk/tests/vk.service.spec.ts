import { Test, TestingModule } from '@nestjs/testing';
import { VkService } from '../vk.service';

describe('VkService', () => {
  let service: VkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VkService],
    }).compile();

    service = module.get<VkService>(VkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
