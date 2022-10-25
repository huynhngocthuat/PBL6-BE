import dotenv from 'dotenv';

dotenv.config();

export default {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USERNAME || 'postgres',
  PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB: process.env.DB_NAME || 'video_share_system',
  dialect: process.env.DB_DIALECT || 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
