import { DataSource } from 'typeorm';

import { envs } from '@app/config/envs.config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.db.host,
  port: envs.db.port,
  username: envs.db.user,
  password: envs.db.pass,
  database: envs.db.name,
  synchronize: envs.db.sync,
  entities: ['**/*.entity.ts'],
  migrations: ['src/app/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
