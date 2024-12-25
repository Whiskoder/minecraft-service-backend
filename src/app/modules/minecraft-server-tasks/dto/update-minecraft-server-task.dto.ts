import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from '@modules/minecraft-server-tasks/enums/task-status.enum';

export class UpdateMinecraftServerTaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  @IsOptional()
  result: string;
}
