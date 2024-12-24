import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  ParseUUIDPipe,
  Res,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { from, switchMap } from 'rxjs';

import { MinecraftModsService } from '@modules/minecraft-mods/minecraft-mods.service';
import { PaginationDto } from '@common/dto/pagination.dto';

@Controller({
  path: 'minecraft/mods',
  version: '1',
})
export class MinecraftModsController {
  constructor(private readonly minecraftModsService: MinecraftModsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 100 }, // 100 MB
    }),
  )
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^application\/java-archive/ }),
        ],
      }),
    )
    minecraftJarFile: Express.Multer.File,
  ) {
    return this.minecraftModsService.upload(minecraftJarFile);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.minecraftModsService.findAll(paginationDto);
  }

  @Get(':id')
  download(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
    from(this.minecraftModsService.download(id))
      .pipe(
        switchMap(({ fileStream, fileName }) => {
          res.setHeader(
            'Content-Disposition',
            `attachment; filename="${fileName}"`,
          );
          res.setHeader('Content-Type', 'application/java-archive');

          return new Promise<void>((resolve, reject) => {
            fileStream.pipe(res);
            fileStream.on('end', resolve);
            fileStream.on('error', reject);
          });
        }),
      )
      .subscribe({
        error: (e) => {
          if (e.status || e.$metadata.httpStatusCode === 404) {
            res.status(404).send('Minecraft mod not found');
          } else {
            res.status(500).send('Internal Server Error');
          }
        },
      });
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.minecraftModsService.delete(id);
  }
}
