import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { MinecraftServer } from '@modules/minecraft-server/entities/minecraft-server.entity';
import { TaskType } from '@modules/minecraft-server-tasks/enums/task-type.enum';
import { TaskStatus } from '@modules/minecraft-server-tasks/enums/task-status.enum';
import { uuid } from '@config/plugins/uuid.plugin';

@Entity({ name: 'minecraft_server_tasks' })
export class MinecraftServerTask {
  @PrimaryColumn()
  id: string = uuid.v7();

  @ManyToOne(() => MinecraftServer, (server) => server.tasks)
  server: MinecraftServer;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  type: TaskType;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
  })
  result: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
