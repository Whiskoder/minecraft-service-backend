import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';

import { uuid } from '@config/plugins/uuid.plugin';
import { MinecraftServer } from '@modules/minecraft-server/entities/minecraft-server.entity';

@Entity({ name: 'minecraft_mods' })
export class MinecraftMod {
  @PrimaryColumn()
  id: string = uuid.v7();

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  fileName: string;

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

  @ManyToMany(() => MinecraftServer)
  servers: MinecraftServer[];
}
