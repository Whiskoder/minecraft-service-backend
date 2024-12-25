import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { uuid } from '@config/plugins/uuid.plugin';
import { MinecraftServer } from '@modules/minecraft-server/entities/minecraft-server.entity';

@Entity({ name: 'minecraft_forge' })
export class MinecraftForge {
  @PrimaryColumn()
  id: string = uuid.v7();

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  version: string;

  @Column({
    type: 'bigint',
    nullable: true,
    default: 0,
  })
  fileSize: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @OneToMany(() => MinecraftServer, (server) => server.forge)
  server: MinecraftServer[];
}
