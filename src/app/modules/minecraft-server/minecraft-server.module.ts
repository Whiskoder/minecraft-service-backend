import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MinecraftServer } from '@modules/minecraft-server/entities/minecraft-server.entity';
import { MinecraftServerController } from '@modules/minecraft-server/minecraft-server.controller';
import { MinecraftServerService } from '@modules/minecraft-server/minecraft-server.service';
import { MinecraftForgeModule } from '@modules/minecraft-forge/minecraft-forge.module';
import { MinecraftModsModule } from '@modules/minecraft-mods/minecraft-mods.module';

@Module({
  controllers: [MinecraftServerController],
  imports: [
    TypeOrmModule.forFeature([MinecraftServer]),
    MinecraftForgeModule,
    MinecraftModsModule,
  ],
  providers: [MinecraftServerService],
  exports: [TypeOrmModule],
})
export class MinecraftServerModule {}
