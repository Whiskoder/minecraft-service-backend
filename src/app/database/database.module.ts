import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envs } from '@config/envs.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.user,
      password: envs.db.pass,
      database: envs.db.name,
      entities: [],
      synchronize: envs.db.sync,
      autoLoadEntities: true,
      ssl: envs.db.ssl,
    }),
  ],
})
export class DatabaseModule {}
