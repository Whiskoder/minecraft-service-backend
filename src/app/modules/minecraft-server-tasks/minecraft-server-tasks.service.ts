import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UpdateMinecraftServerTaskDto } from '@modules/minecraft-server-tasks/dto/update-minecraft-server-task.dto';
import { MinecraftServer } from '@modules/minecraft-server/entities/minecraft-server.entity';
import { MinecraftServerTask } from '@modules/minecraft-server-tasks/entities/minecraft-server-task.entity';
import { handleExceptions } from '@common/helpers/handleExceptions.helper';
import { PaginationDto } from '@common/dto/pagination.dto';
import { TaskType } from './enums/task-type.enum';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class MinecraftServerTasksService {
  private readonly $logger: Logger = new Logger('MinecraftServerTasksService');

  constructor(
    @InjectRepository(MinecraftServerTask)
    private readonly minecraftServerTaskRepository: Repository<MinecraftServerTask>,
    @InjectRepository(MinecraftServer)
    private readonly minecraftServerRepository: Repository<MinecraftServer>,
  ) {}

  // TODO: Notify subscribers when a task is created
  async createTask(serverId: string, taskType: TaskType) {
    try {
      const minecraftServerEntity =
        await this.minecraftServerRepository.findOne({
          where: { id: serverId, isActive: true },
        });

      if (!minecraftServerEntity)
        throw new NotFoundException('Minecraft server not found');

      const minecraftServerTaskEntity =
        this.minecraftServerTaskRepository.create({
          server: minecraftServerEntity,
          type: taskType,
        });

      await this.minecraftServerTaskRepository.save(minecraftServerTaskEntity);

      return {
        tasks: minecraftServerTaskEntity,
        server: minecraftServerEntity,
      };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async findAll(serverId: string, paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const [minecraftServerTask, total] =
        await this.minecraftServerTaskRepository.findAndCount({
          skip: offset,
          take: limit,
          where: { server: { id: serverId, isActive: true } },
        });

      return {
        tasks: minecraftServerTask,
        pagination: { total, limit, offset },
      };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async findOne(serverId: string, taskId: string) {
    try {
      const minecraftServerTaskEntity =
        await this.minecraftServerTaskRepository.findOne({
          where: { id: taskId, server: { id: serverId, isActive: true } },
        });

      if (!minecraftServerTaskEntity)
        throw new NotFoundException('Minecraft server task not found');

      return { tasks: minecraftServerTaskEntity };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async findForgeServerRunningTask(serverId: string) {
    try {
      const minecraftServerTaskEntity =
        await this.minecraftServerTaskRepository.findOne({
          where: {
            server: { id: serverId, isActive: true },
            type: TaskType.FORGE_SERVER,
            status: TaskStatus.RUNNING,
          },
          relations: ['server'],
        });

      if (!minecraftServerTaskEntity)
        throw new NotFoundException('Minecraft server task not found');

      const { server, ...taskEntity } = minecraftServerTaskEntity;

      return { tasks: taskEntity, server };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  // TODO: Notify subscribers when a task is updated
  async update(
    serverId: string,
    taskId: string,
    updateMinecraftServerTaskDto: UpdateMinecraftServerTaskDto,
  ) {
    try {
      const { status, result } = updateMinecraftServerTaskDto;

      const response = await this.minecraftServerTaskRepository.update(
        { id: taskId, server: { id: serverId } },
        { status, result },
      );

      if (response.affected === 0)
        throw new NotFoundException('Minecraft server task not found');

      return;
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }
}
