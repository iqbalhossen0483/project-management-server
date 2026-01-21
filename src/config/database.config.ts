import { DataSource } from 'typeorm';
import config from './config';

export const TypeORM = new DataSource({
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: ['src/entity/*.js'],
  logging: true,
  synchronize: true,
});
