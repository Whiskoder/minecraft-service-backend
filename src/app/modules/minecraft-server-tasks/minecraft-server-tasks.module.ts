import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { envs } from '@config/envs.config';
import { MINECRAFT_SERVER_COMMANDS_MICROSERVICE } from '@config/services.config';
import { MinecraftServerModule } from '@modules/minecraft-server/minecraft-server.module';
import { MinecraftServerTask } from '@modules/minecraft-server-tasks/entities/minecraft-server-task.entity';
import { MinecraftServerTasksController } from '@modules/minecraft-server-tasks/minecraft-server-tasks.controller';
import { MinecraftServerTasksService } from '@modules/minecraft-server-tasks/minecraft-server-tasks.service';

@Module({
  controllers: [MinecraftServerTasksController],
  imports: [
    TypeOrmModule.forFeature([MinecraftServerTask]),
    ClientsModule.register([
      {
        name: MINECRAFT_SERVER_COMMANDS_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.minecraftServerCommandsMicroservice.host,
          port: envs.minecraftServerCommandsMicroservice.port,
        },
      },
    ]),
    MinecraftServerModule,
  ],
  providers: [MinecraftServerTasksService],
})
export class MinecraftServerTasksModule {}
