import dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });

interface Config {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  corsOrigin: string[];
  tokenSecret: string;
  database: {
    type: PostgresConnectionOptions['type'];
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api',
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000'],
  tokenSecret: process.env.JWT_SECRET || 'secret',
  database: {
    type: (process.env.DATABASE_TYPE ||
      'postgres') as PostgresConnectionOptions['type'],
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'project-management',
  },
};

export default config;
