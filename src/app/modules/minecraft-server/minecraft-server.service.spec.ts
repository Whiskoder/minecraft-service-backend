import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftServerService } from './minecraft-server.service';

describe('MinecraftServerService', () => {
  let service: MinecraftServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinecraftServerService],
    }).compile();

    service = module.get<MinecraftServerService>(MinecraftServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
