import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  Query,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { from, switchMap } from 'rxjs';
import { Response } from 'express';

import { MinecraftForgeService } from '@modules/minecraft-forge/minecraft-forge.service';
import { PaginationDto } from '@common/dto/pagination.dto';
import { ParseVersionPipe } from '@modules/minecraft-forge/pipes/parse-version/parse-version.pipe';

@Controller({
  path: 'minecraft/forge',
  version: '1',
})
export class MinecraftForgeController {
  constructor(private readonly minecraftForgeService: MinecraftForgeService) {}

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
    jarFile: Express.Multer.File,
    @Body('version') version: string,
  ) {
    return this.minecraftForgeService.upload(jarFile, version);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.minecraftForgeService.findAll(paginationDto);
  }

  @Get(':version')
  download(
    @Res() res: Response,
    @Param('version', ParseVersionPipe) version: string,
  ) {
    from(this.minecraftForgeService.download(version))
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
            res.status(404).send('Minecraft forge version not found');
          } else {
            res.status(500).send('Internal Server Error');
          }
        },
      });
  }

  @Delete(':id')
  dekete(@Param('id', ParseUUIDPipe) id: string) {
    return this.minecraftForgeService.delete(id);
  }
}
