import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { MinecraftServerTask } from '@modules/minecraft-server-tasks/entities/minecraft-server-task.entity';
import { uuid } from '@config/plugins/uuid.plugin';
import { MinecraftForge } from '@modules/minecraft-forge/entities/minecraft-forge.entity';
import { MinecraftMod } from '@modules/minecraft-mods/entities/minecraft-mod.entity';
import { MemoryUnit } from '@modules/minecraft-server/enums/memory-unit.enum';

@Entity({ name: 'minecraft_servers' })
export class MinecraftServer {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @ManyToOne(() => MinecraftForge, (forge) => forge.server, { eager: true })
  forge: MinecraftForge;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Index()
  isActive: boolean;

  @Column({
    type: 'int',
    default: 4,
  })
  maxMemory: number;

  @Column({
    type: 'enum',
    enum: MemoryUnit,
    default: MemoryUnit.G,
  })
  maxMemoryUnit: MemoryUnit;

  @Column({
    type: 'int',
    default: 2,
  })
  minMemory: number;

  @Column({
    type: 'enum',
    enum: MemoryUnit,
    default: MemoryUnit.G,
  })
  minMemoryUnit: MemoryUnit;

  @ManyToMany(() => MinecraftMod, (mods) => mods.servers)
  mods: MinecraftMod[];

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  running: boolean;

  @OneToMany(() => MinecraftServerTask, (serverTask) => serverTask.server)
  tasks: MinecraftServerTask[];

  @PrimaryColumn()
  id: string = uuid.v7();

  // TODO: Add server properties

  @BeforeInsert()
  beforeInsert() {
    this.name = this.name.toLowerCase().trim().replaceAll(' ', '-');
  }
}
