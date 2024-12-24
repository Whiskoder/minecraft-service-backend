import { PartialType } from '@nestjs/mapped-types';
import { CreateAzureVirtualMachineDto } from './create-azure-virtual-machine.dto';

export class UpdateAzureVirtualMachineDto extends PartialType(CreateAzureVirtualMachineDto) {
  id: number;
}
