import { Test, TestingModule } from '@nestjs/testing';
import { MigrationsService } from '../services/migrations.service';

describe('MigrationsService', () => {
  let service: MigrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrationsService],
    }).compile();

    service = module.get<MigrationsService>(MigrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
