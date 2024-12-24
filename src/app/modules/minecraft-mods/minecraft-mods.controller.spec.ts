import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftModsController } from './minecraft-mods.controller';
import { MinecraftModsService } from './minecraft-mods.service';

describe('MinecraftModsController', () => {
  let controller: MinecraftModsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinecraftModsController],
      providers: [MinecraftModsService],
    }).compile();

    controller = module.get<MinecraftModsController>(MinecraftModsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
