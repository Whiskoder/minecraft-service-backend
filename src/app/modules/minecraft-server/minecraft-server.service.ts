import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateMinecraftServerDto } from '@modules/minecraft-server/dto/create-minecraft-server.dto';
import { handleExceptions } from '@common/helpers/handleExceptions.helper';
import { MinecraftForge } from '@modules/minecraft-forge/entities/minecraft-forge.entity';
import { MinecraftMod } from '@modules/minecraft-mods/entities/minecraft-mod.entity';
import { MinecraftServer } from '@modules/minecraft-server/entities/minecraft-server.entity';
import { PaginationDto } from '@common/dto/pagination.dto';
import { UpdateMinecraftServerDto } from '@modules/minecraft-server/dto/update-minecraft-server.dto';

@Injectable()
export class MinecraftServerService {
  private readonly $logger: Logger = new Logger('MinecraftServerService');

  constructor(
    @InjectRepository(MinecraftServer)
    private readonly minecraftServerRepository: Repository<MinecraftServer>,
    @InjectRepository(MinecraftForge)
    private readonly minecraftForgeRepository: Repository<MinecraftForge>,
    @InjectRepository(MinecraftMod)
    private readonly minecraftModsRepository: Repository<MinecraftMod>,
  ) {}

  async create(createMinecraftServerDto: CreateMinecraftServerDto) {
    let name = createMinecraftServerDto.name
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-');

    try {
      const exists = await this.minecraftServerRepository.findOne({
        where: { name, isActive: true },
      });

      if (exists)
        throw new BadRequestException('Minecraft server already exists');

      const minecraftForgeEntity = await this.minecraftForgeRepository.findOne({
        where: { version: createMinecraftServerDto.version },
      });

      if (!minecraftForgeEntity)
        throw new BadRequestException('Forge version not found');

      const minecraftServerEntity = this.minecraftServerRepository.create({
        forge: minecraftForgeEntity,
        ...createMinecraftServerDto,
      });

      await this.minecraftServerRepository.save(minecraftServerEntity);

      return { servers: minecraftServerEntity };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const [minecraftServer, total] =
        await this.minecraftServerRepository.findAndCount({
          skip: offset,
          take: limit,
          where: { isActive: true },
        });

      return { servers: minecraftServer, pagination: { total, limit, offset } };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async findOne(serverId: string) {
    try {
      const minecraftServerEntity =
        await this.minecraftServerRepository.findOne({
          where: { id: serverId, isActive: true },
        });

      if (!minecraftServerEntity)
        throw new NotFoundException('Minecraft server not found');

      return { servers: minecraftServerEntity };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async update(
    serverId: string,
    updateMinecraftServerDto: UpdateMinecraftServerDto,
  ) {
    try {
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async updateStatus(serverId: string, running: boolean) {
    try {
      const response = await this.minecraftServerRepository.update(
        { id: serverId, isActive: true },
        { running },
      );

      if (response.affected === 0)
        throw new NotFoundException('Minecraft server not found');

      return;
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async delete(serverId: string) {
    try {
      const response = await this.minecraftServerRepository.update(
        { id: serverId, isActive: true },
        { isActive: false },
      );

      if (response.affected === 0)
        throw new NotFoundException('Minecraft server not found');

      return;
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }
}
