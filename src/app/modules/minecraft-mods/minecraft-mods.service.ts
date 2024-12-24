import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Readable } from 'typeorm/platform/PlatformTools';

import { BucketService } from '@modules/bucket/bucket.service';
import { envs } from '@config/envs.config';
import { handleExceptions } from '@common/helpers/handleExceptions.helper';
import { MinecraftMod } from '@modules/minecraft-mods/entities/minecraft-mod.entity';
import { PaginationDto } from '@common/dto/pagination.dto';

@Injectable()
export class MinecraftModsService {
  private readonly $logger: Logger = new Logger('MinecraftModsService');
  private readonly url: string;

  constructor(
    private readonly bucketService: BucketService,
    @InjectRepository(MinecraftMod)
    private readonly minecraftModRepository: Repository<MinecraftMod>,
  ) {
    this.url = envs.hostUrl;
  }

  async upload(minecraftJarFile: Express.Multer.File) {
    try {
      const minecraftModEntity = this.minecraftModRepository.create({
        fileName: minecraftJarFile.originalname,
        fileSize: minecraftJarFile.size,
      });
      await this.minecraftModRepository.save(minecraftModEntity);

      const id = minecraftModEntity.id;

      const key = `mods/${id}`;

      const response = await this.bucketService.putObject(
        key,
        minecraftJarFile,
      );
      if (response.$metadata.httpStatusCode !== 200) {
        this.minecraftModRepository.delete({ id });
        throw new InternalServerErrorException();
      }
      const downloadUrl = `${this.url}/api/v1/minecraft/mods/${id}`;
      return { downloadUrl, mods: minecraftModEntity };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const [minecraftMods, total] =
        await this.minecraftModRepository.findAndCount({
          take: limit,
          skip: offset,
        });

      return { mods: minecraftMods, pagination: { total, limit, offset } };
    } catch (e) {
      handleExceptions(e, this.$logger);
    }
  }

  async download(id: string) {
    const minecraftModEntity = await this.minecraftModRepository.findOne({
      where: { id },
    });

    if (!minecraftModEntity)
      throw new NotFoundException('Minecraft mod not found');

    const fileName = minecraftModEntity.fileName;
    const fileStream = (await this.bucketService.getObject(`mods/${id}`))
      .Body as Readable;
    return { fileStream, fileName };
  }

  async delete(id: string) {
    const minecraftModEntity = await this.minecraftModRepository.findOne({
      where: { id },
    });

    if (!minecraftModEntity)
      throw new NotFoundException('Minecraft mod not found');

    await this.minecraftModRepository.delete({ id });

    const response = await this.bucketService.deleteObject(`mods/${id}`);
    if (response.$metadata.httpStatusCode !== 204)
      throw new InternalServerErrorException();

    return;
  }
}
