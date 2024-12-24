import { Test, TestingModule } from '@nestjs/testing';
import { AzureVirtualMachineService } from './azure-virtual-machine.service';

describe('AzureVirtualMachineService', () => {
  let service: AzureVirtualMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureVirtualMachineService],
    }).compile();

    service = module.get<AzureVirtualMachineService>(AzureVirtualMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
