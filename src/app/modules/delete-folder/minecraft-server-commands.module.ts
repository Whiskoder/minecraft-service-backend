// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';

// import { envs } from '@config/envs.config';
// import { MINECRAFT_SERVER_COMMANDS_MICROSERVICE } from '@config/services.config';
// import { MinecraftServerCommandsController } from '@modules/minecraft-server-commands/minecraft-server-commands.controller';
// import { MinecraftServerCommandsService } from '@modules/minecraft-server-commands/minecraft-server-commands.service';
// import { MinecraftServerModule } from '@modules/minecraft-server/minecraft-server.module';
// import { MinecraftServerTasksModule } from '@modules/minecraft-server-tasks/minecraft-server-tasks.module';

// @Module({
//   controllers: [MinecraftServerCommandsController],
//   imports: [
//     ClientsModule.register([
//       {
//         name: MINECRAFT_SERVER_COMMANDS_MICROSERVICE,
//         transport: Transport.TCP,
//         options: {
//           host: envs.minecraftServerCommandsMicroservice.host,
//           port: envs.minecraftServerCommandsMicroservice.port,
//         },
//       },
//     ]),
//     MinecraftServerModule,
//     MinecraftServerTasksModule,
//   ],
//   providers: [MinecraftServerCommandsService],
// })
// export class MinecraftServerCommandsModule {}
