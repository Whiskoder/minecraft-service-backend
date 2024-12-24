import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftModsService } from './minecraft-mods.service';

describe('MinecraftModsService', () => {
  let service: MinecraftModsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinecraftModsService],
    }).compile();

    service = module.get<MinecraftModsService>(MinecraftModsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
