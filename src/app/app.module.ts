import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AzureVirtualMachineModule } from '@modules/azure-virtual-machine/azure-virtual-machine.module';
import { BucketModule } from '@modules/bucket/bucket.module';
import { DatabaseModule } from '@database/database.module';
import { envs } from '@config/envs.config';
import { MinecraftForgeModule } from '@modules/minecraft-forge/minecraft-forge.module';
import { MinecraftModsModule } from '@modules/minecraft-mods/minecraft-mods.module';
import { MinecraftServerTasksModule } from '@modules/minecraft-server-tasks/minecraft-server-tasks.module';
import { MinecraftServerModule } from '@modules/minecraft-server/minecraft-server.module';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot([
      { ttl: envs.throttler.ttl, limit: envs.throttler.limit },
    ]),
    // Local
    AzureVirtualMachineModule,
    MinecraftModsModule,
    MinecraftForgeModule,
    BucketModule,
    MinecraftServerTasksModule,
    MinecraftServerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
