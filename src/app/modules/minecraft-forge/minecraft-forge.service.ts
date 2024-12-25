import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { envs } from '@config/envs.config';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { MinecraftForge } from '@modules/minecraft-forge/entities/minecraft-forge.entity';
import { BucketService } from '@modules/bucket/bucket.service';
import { handleExceptions } from '@common/helpers/handleExceptions.helper';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Readable } from 'stream';

@Injectable()
export class MinecraftForgeService {
  private readonly $logger = new Logger('MinecraftForgeService');
  private readonly url: string;

  constructor(
    private readonly bucketService: BucketService,
    @InjectRepository(MinecraftForge)
    private readonly minecraftForgeRepository: Repository<MinecraftForge>,
  ) {
    this.url = envs.hostUrl;
  }

  async upload(jarFile: Express.Multer.File, version: string) {
    try {
      const minecraftForgeEntity = this.minecraftForgeRepository.create({
        fileSize: jarFile.size,
        version,
      });
      await this.minecraftForgeRepository.save(minecraftForgeEntity);

      const id = minecraftForgeEntity.id;

      const key = `forge/${id}`;

      const response = await this.bucketService.putObject(key, jarFile);
      if (response.$metadata.httpStatusCode !== 200) {
        this.minecraftForgeRepository.delete({ id });
        throw new InternalServerErrorException();
      }

      const downloadUrl = `${this.url}/api/v1/minecraft/forge/${id}`;
      return { downloadUrl, forge: minecraftForgeEntity };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const [minecraftForge, total] =
        await this.minecraftForgeRepository.findAndCount({
          take: limit,
          skip: offset,
        });

      return { forge: minecraftForge, pagination: { total, limit, offset } };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async download(version: string) {
    const minecraftForgeEntity = await this.minecraftForgeRepository.findOne({
      where: { version },
    });

    if (!minecraftForgeEntity)
      throw new NotFoundException('Minecraft forge version not found');

    const fileName = 'forge-installer.jar';
    const fileStream = (
      await this.bucketService.getObject(`forge/${minecraftForgeEntity.id}`)
    ).Body as Readable;

    return { fileStream, fileName };
  }

  async delete(id: string) {
    const minecraftForgeEntity = await this.minecraftForgeRepository.findOne({
      where: { id },
    });

    if (!minecraftForgeEntity)
      throw new NotFoundException('Minecraft forge version not found');

    await this.minecraftForgeRepository.delete({ id });

    const response = await this.bucketService.deleteObject(`forge/${id}`);
    if (response.$metadata.httpStatusCode !== 204)
      throw new InternalServerErrorException();

    return;
  }
}
