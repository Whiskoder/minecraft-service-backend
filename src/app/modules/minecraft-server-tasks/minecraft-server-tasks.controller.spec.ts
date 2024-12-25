import { Test, TestingModule } from '@nestjs/testing';
import { MinecraftServerTasksController } from './minecraft-server-tasks.controller';
import { MinecraftServerTasksService } from './minecraft-server-tasks.service';

describe('MinecraftServerTasksController', () => {
  let controller: MinecraftServerTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinecraftServerTasksController],
      providers: [MinecraftServerTasksService],
    }).compile();

    controller = module.get<MinecraftServerTasksController>(MinecraftServerTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
