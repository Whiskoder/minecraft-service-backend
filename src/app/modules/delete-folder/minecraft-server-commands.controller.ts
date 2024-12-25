// import { Controller, Post, Inject, ParseUUIDPipe, Body } from '@nestjs/common';
// import { ClientProxy, RpcException } from '@nestjs/microservices';

// import { catchError } from 'rxjs';

// import { MINECRAFT_SERVER_COMMANDS_MICROSERVICE } from '@config/services.config';
// import { ServerId } from '@common/decorators/server-name.decorator';
// import { MinecraftServerCommandsService } from '@modules/minecraft-server-commands/minecraft-server-commands.service';
// import { MinecraftServerService } from '../minecraft-server/minecraft-server.service';
// import { CreateMinecraftServerDto } from '../minecraft-server/dto/create-minecraft-server.dto';

// @Controller({
//   path: 'minecraft/server/:serverId/cmd',
//   version: '1',
// })
// export class MinecraftServerCommandsController {
//   constructor(
//     @Inject(MINECRAFT_SERVER_COMMANDS_MICROSERVICE)
//     private readonly client: ClientProxy,
//     private readonly minecraftServerService: MinecraftServerService,
//   ) {}

//   @Post('run-forge-installer')
//   async create(
//     @ServerId(ParseUUIDPipe) serverId: string,
//     @Body() createMinecraftServerDto: CreateMinecraftServerDto,
//   ) {
//     // TODO: Create a task and send task id to client
//     // Check if server id exists
//     // Client should update the task status
//     // Before sending the task, should check if the current server is running
//     // await this.minecraftServerCommandsService.
//     await this.minecraftServerService.create(createMinecraftServerDto);

//     return this.sendCommand('run-forge-installer', { serverId });
//   }

//   private sendCommand(command: string, payload: unknown) {
//     return this.client.send(command, payload).pipe(
//       catchError((e) => {
//         throw new RpcException(e);
//       }),
//     );
//   }
// }
