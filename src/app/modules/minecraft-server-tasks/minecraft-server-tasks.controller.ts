import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { MINECRAFT_SERVER_COMMANDS_MICROSERVICE } from '@config/services.config';
import { MinecraftServerTasksService } from '@modules/minecraft-server-tasks/minecraft-server-tasks.service';
import { PaginationDto } from '@common/dto/pagination.dto';
import { ServerId } from '@common/decorators/server-name.decorator';
import { TaskType } from '@modules/minecraft-server-tasks/enums/task-type.enum';
import { UpdateMinecraftServerTaskDto } from '@modules/minecraft-server-tasks/dto/update-minecraft-server-task.dto';

@Controller({
  path: 'minecraft/server/:serverId/tasks',
  version: '1',
})
export class MinecraftServerTasksController {
  constructor(
    @Inject(MINECRAFT_SERVER_COMMANDS_MICROSERVICE)
    private readonly client: ClientProxy,
    private readonly minecraftServerTasksService: MinecraftServerTasksService,
  ) {}

  @Post('run-forge-installer')
  async runForgeInstaller(@ServerId(ParseUUIDPipe) serverId: string) {
    const result = await this.minecraftServerTasksService.createTask(
      serverId,
      TaskType.FORGE_INSTALLER,
    );

    this.client.emit('run-forge-installer', { ...result });
    return { message: 'Installing forge server' };
  }

  @Post('run-install-mods')
  async runInstallMods(@ServerId(ParseUUIDPipe) serverId: string) {
    const result = await this.minecraftServerTasksService.createTask(
      serverId,
      TaskType.MOD_INSTALLER,
    );

    this.client.emit('run-install-mods', { ...result });
    return { message: 'Installing mods' };
  }

  @Post('run-forge-server')
  async runForgeServer(@ServerId(ParseUUIDPipe) serverId: string) {
    const result = await this.minecraftServerTasksService.createTask(
      serverId,
      TaskType.FORGE_SERVER,
    );

    this.client.emit('run-forge-server', { ...result });
    return { message: 'Starting forge server' };
  }

  @Post('stop-forge-server')
  async stopForgeServer(@ServerId(ParseUUIDPipe) serverId: string) {
    const result =
      await this.minecraftServerTasksService.findForgeServerRunningTask(
        serverId,
      );
    this.client.emit('stop-forge-server', { ...result });
    return { message: 'Stopping forge server' };
  }

  @Post('kill-forge-server')
  async killForgeServer(@ServerId(ParseUUIDPipe) serverId: string) {
    const result =
      await this.minecraftServerTasksService.findForgeServerRunningTask(
        serverId,
      );
    this.client.emit('kill-forge-server', { ...result });
    return { message: 'Killing forge server' };
  }

  @Get()
  findAll(
    @ServerId(ParseUUIDPipe) serverId: string,
    @Param() paginationDto: PaginationDto,
  ) {
    return this.minecraftServerTasksService.findAll(serverId, paginationDto);
  }

  @Get(':taskId')
  findOne(
    @ServerId(ParseUUIDPipe) serverId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.minecraftServerTasksService.findOne(serverId, taskId);
  }

  // TODO: Only minecraft server service should be able to update a task server
  @Patch(':taskId')
  update(
    @ServerId(ParseUUIDPipe) serverId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() updateMinecraftServerTaskDto: UpdateMinecraftServerTaskDto,
  ) {
    return this.minecraftServerTasksService.update(
      serverId,
      taskId,
      updateMinecraftServerTaskDto,
    );
  }
}
