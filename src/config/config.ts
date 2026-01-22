import dotenv from 'dotenv';

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });

interface Config {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  corsOrigin: string[];
  tokenSecret: string;
  mongoUrl: string;
  dataPerPage: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api',
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000'],
  tokenSecret: process.env.JWT_SECRET || 'secret',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  dataPerPage: Number(process.env.DATA_PER_PAGE) || 10,
};

export default config;
