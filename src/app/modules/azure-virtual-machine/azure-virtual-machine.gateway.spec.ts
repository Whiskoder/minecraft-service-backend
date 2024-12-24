import { Test, TestingModule } from '@nestjs/testing';
import { AzureVirtualMachineGateway } from './azure-virtual-machine.gateway';
import { AzureVirtualMachineService } from './azure-virtual-machine.service';

describe('AzureVirtualMachineGateway', () => {
  let gateway: AzureVirtualMachineGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureVirtualMachineGateway, AzureVirtualMachineService],
    }).compile();

    gateway = module.get<AzureVirtualMachineGateway>(AzureVirtualMachineGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
