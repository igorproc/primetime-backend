import { Test, TestingModule } from '@nestjs/testing';
import { BalancersController } from '../balancers.controller';

describe('BalancersController', () => {
  let controller: BalancersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalancersController],
    }).compile();

    controller = module.get<BalancersController>(BalancersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
