import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { AzureVirtualMachineService } from './azure-virtual-machine.service';
import { CreateAzureVirtualMachineDto } from './dto/create-azure-virtual-machine.dto';
import { UpdateAzureVirtualMachineDto } from './dto/update-azure-virtual-machine.dto';

@WebSocketGateway(80, { namespace: 'azure-virtual-machine' })
export class AzureVirtualMachineGateway {
  constructor(
    private readonly azureVirtualMachineService: AzureVirtualMachineService,
  ) {}
  @SubscribeMessage('download-minecraft-mods')
  runCommand() {
    return this.azureVirtualMachineService.runCommand('command');
  }

  // @SubscribeMessage('createAzureVirtualMachine')
  // create(
  //   @MessageBody() createAzureVirtualMachineDto: CreateAzureVirtualMachineDto,
  // ) {
  //   return this.azureVirtualMachineService.create(createAzureVirtualMachineDto);
  // }

  // @SubscribeMessage('findAllAzureVirtualMachine')
  // findAll() {
  //   return this.azureVirtualMachineService.findAll();
  // }

  // @SubscribeMessage('findOneAzureVirtualMachine')
  // findOne(@MessageBody() id: number) {
  //   return this.azureVirtualMachineService.findOne(id);
  // }

  // @SubscribeMessage('updateAzureVirtualMachine')
  // update(
  //   @MessageBody() updateAzureVirtualMachineDto: UpdateAzureVirtualMachineDto,
  // ) {
  //   return this.azureVirtualMachineService.update(
  //     updateAzureVirtualMachineDto.id,
  //     updateAzureVirtualMachineDto,
  //   );
  // }

  // @SubscribeMessage('removeAzureVirtualMachine')
  // remove(@MessageBody() id: number) {
  //   return this.azureVirtualMachineService.remove(id);
  // }
}
