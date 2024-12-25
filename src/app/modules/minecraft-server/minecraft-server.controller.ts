import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { MinecraftServerService } from './minecraft-server.service';
import { CreateMinecraftServerDto } from './dto/create-minecraft-server.dto';
import { UpdateMinecraftServerDto } from './dto/update-minecraft-server.dto';
import { PaginationDto } from '@common/dto/pagination.dto';

@Controller({
  path: 'minecraft/server',
  version: '1',
})
export class MinecraftServerController {
  constructor(
    private readonly minecraftServerService: MinecraftServerService,
  ) {}

  @Post()
  create(@Body() createMinecraftServerDto: CreateMinecraftServerDto) {
    return this.minecraftServerService.create(createMinecraftServerDto);
  }

  @Get()
  findAll(@Param() paginationDto: PaginationDto) {
    return this.minecraftServerService.findAll(paginationDto);
  }

  @Get(':serverId')
  findOne(@Param('serverId', ParseUUIDPipe) serverId: string) {
    return this.minecraftServerService.findOne(serverId);
  }

  @Patch(':serverId')
  update(
    @Param('serverId', ParseUUIDPipe) serverId: string,
    @Body() updateMinecraftServerDto: UpdateMinecraftServerDto,
  ) {
    return this.minecraftServerService.update(
      serverId,
      updateMinecraftServerDto,
    );
  }

  //TODO:  ONLY MINECRAFT SERVER SERVICE SHOULD BE ABLE TO UPDATE SERVER STATUS
  @Patch(':serverId/status')
  updateStatus(
    @Param('serverId', ParseUUIDPipe) serverId: string,
    @Query(ParseBoolPipe) running: boolean,
  ) {
    return this.minecraftServerService.updateStatus(serverId, running);
  }

  // TODO: Only minecraft server service should be able to delete a server
  @Delete(':serverId')
  delete(@Param('serverId', ParseUUIDPipe) serverId: string) {
    return this.minecraftServerService.delete(serverId);
  }
}
