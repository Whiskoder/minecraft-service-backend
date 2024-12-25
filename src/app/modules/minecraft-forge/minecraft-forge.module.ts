import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BucketModule } from '@modules/bucket/bucket.module';
import { MinecraftForge } from '@modules/minecraft-forge/entities/minecraft-forge.entity';
import { MinecraftForgeController } from '@modules/minecraft-forge/minecraft-forge.controller';
import { MinecraftForgeService } from '@modules/minecraft-forge/minecraft-forge.service';

@Module({
  controllers: [MinecraftForgeController],
  providers: [MinecraftForgeService],
  imports: [BucketModule, TypeOrmModule.forFeature([MinecraftForge])],
  exports: [TypeOrmModule],
})
export class MinecraftForgeModule {}
