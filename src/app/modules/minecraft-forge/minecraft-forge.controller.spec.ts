import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftForgeController } from './minecraft-forge.controller';
import { MinecraftForgeService } from './minecraft-forge.service';

describe('MinecraftForgeController', () => {
  let controller: MinecraftForgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinecraftForgeController],
      providers: [MinecraftForgeService],
    }).compile();

    controller = module.get<MinecraftForgeController>(MinecraftForgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
