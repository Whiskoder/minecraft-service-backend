import { Module } from '@nestjs/common';
import { AzureVirtualMachineService } from './azure-virtual-machine.service';
import { AzureVirtualMachineGateway } from './azure-virtual-machine.gateway';
import { MinecraftModsModule } from '../minecraft-mods/minecraft-mods.module';

@Module({
  providers: [AzureVirtualMachineGateway, AzureVirtualMachineService],
  imports: [MinecraftModsModule],
})
export class AzureVirtualMachineModule {}
