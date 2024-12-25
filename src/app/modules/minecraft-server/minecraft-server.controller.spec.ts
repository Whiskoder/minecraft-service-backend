import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftServerController } from './minecraft-server.controller';
import { MinecraftServerService } from './minecraft-server.service';

describe('MinecraftServerController', () => {
  let controller: MinecraftServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinecraftServerController],
      providers: [MinecraftServerService],
    }).compile();

    controller = module.get<MinecraftServerController>(MinecraftServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
