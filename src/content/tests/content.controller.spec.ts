import { Test, TestingModule } from '@nestjs/testing';
import { BalancerController } from '../controllers/balancer.controller';

describe('ContentController', () => {
  let controller: BalancerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalancerController],
    }).compile();

    controller = module.get<BalancerController>(BalancerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
