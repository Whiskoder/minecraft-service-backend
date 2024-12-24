import { Injectable } from '@nestjs/common';
import { envs } from '@config/envs.config';
import { ComputeManagementClient } from '@azure/arm-compute';
import { TokenCredential, AccessToken } from '@azure/identity';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { MinecraftMod } from '../minecraft-mods/entities/minecraft-mod.entity';
import { Repository } from 'typeorm';
// import { CreateAzureVirtualMachineDto } from './dto/create-azure-virtual-machine.dto';
// import { UpdateAzureVirtualMachineDto } from './dto/update-azure-virtual-machine.dto';

@Injectable()
export class AzureVirtualMachineService {
  private readonly subscriptionId: string;
  private readonly resourceGroupName: string;
  private readonly vmName: string;

  private client: ComputeManagementClient;

  constructor(
    @InjectRepository(MinecraftMod)
    private readonly minecraftModRepository: Repository<MinecraftMod>,
  ) {
    this.subscriptionId = envs.azure.subscriptionId;
    this.resourceGroupName = envs.azure.resourceGroupName;
    this.vmName = envs.azure.vmName;

    this.getTokenForScope('https://management.azure.com/.default').then(
      (accessToken) => {
        const credential = {
          getToken: async () => {
            return accessToken;
          },
        };
        this.client = new ComputeManagementClient(
          credential,
          this.subscriptionId,
        );
      },
    );
  }

  private async getTokenForScope(scope: string): Promise<AccessToken> {
    const tenantId = envs.azure.tenantId;
    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const body = new URLSearchParams({
      client_id: envs.azure.clientId,
      client_secret: envs.azure.clientSecret,
      grant_type: 'client_credentials',
      scope,
    });

    const response = await axios.post(url, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const token = response.data.access_token;
    const expiresIn = response.data.expires_in;

    return {
      token,
      expiresOnTimestamp: Date.now() + expiresIn * 1000,
    };
  }

  async runCommand(command: string) {
    const params = {
      commandId: 'RunShellScript',
      script: ['echo Hello World'],
    };
    const result = await this.client.virtualMachines.beginRunCommandAndWait(
      this.resourceGroupName,
      this.vmName,
      params,
    );
    console.log(result);
  }
}
