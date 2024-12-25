import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftServerTasksService } from './minecraft-server-tasks.service';

describe('MinecraftServerTasksService', () => {
  let service: MinecraftServerTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinecraftServerTasksService],
    }).compile();

    service = module.get<MinecraftServerTasksService>(MinecraftServerTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
