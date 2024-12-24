import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MinecraftModsService } from '@modules/minecraft-mods/minecraft-mods.service';
import { MinecraftModsController } from '@modules/minecraft-mods/minecraft-mods.controller';
import { BucketModule } from '@modules/bucket/bucket.module';
import { MinecraftMod } from '@modules/minecraft-mods/entities/minecraft-mod.entity';

@Module({
  controllers: [MinecraftModsController],
  providers: [MinecraftModsService],
  imports: [BucketModule, TypeOrmModule.forFeature([MinecraftMod])],
  exports: [TypeOrmModule],
})
export class MinecraftModsModule {}
