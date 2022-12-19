import dotenv from 'dotenv';
import * as redis from 'redis';
import logger from 'configs/winston.config';
import { errors, infors } from 'constants';

dotenv.config();

const redisClient = redis.createClient();

(async () => {
  redisClient.on('error', (error) => {
    logger.error(`${errors.REDIS_CONNECTED_ERROR} - ${error}`);
  });
  redisClient.on('connect', () => {
    logger.info(`${infors.REDIS_CONNECTED_SUCCESS}`);
  });

  await redisClient.connect();
})();

export default redisClient;
