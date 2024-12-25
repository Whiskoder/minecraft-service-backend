import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftForgeService } from './minecraft-forge.service';

describe('MinecraftForgeService', () => {
  let service: MinecraftForgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinecraftForgeService],
    }).compile();

    service = module.get<MinecraftForgeService>(MinecraftForgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
