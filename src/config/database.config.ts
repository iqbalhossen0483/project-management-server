import { DataSource } from 'typeorm';
import { Invite } from '../entity/invite.entity';
import { Project } from '../entity/project.entity';
import { User } from '../entity/user.entity';
import config from './config';

export const TypeORM = new DataSource({
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [User, Project, Invite],
  logging: true,
  synchronize: true,
});
