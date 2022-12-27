import redisClient from 'configs/redis.config';
import { getPublicIdOnUrl } from './upload';

export async function setKey(database, key, data) {
  await redisClient.select(database);
  await redisClient.set(key, data);
}

export async function getKey(database, key) {
  await redisClient.select(database);
  const data = await redisClient.get(key);

  return data;
}

export async function getAllKey(database, pattern = '*') {
  await redisClient.select(database);
  const keys = await redisClient.keys(pattern);

  return keys;
}

export async function delUrlFilesOnRedis(database, ...key) {
  for (let i = 0; i < key.length; i += 1) {
    if (key[i].trim()) {
      const publicId = getPublicIdOnUrl(key[i]);
      // eslint-disable-next-line no-await-in-loop
      await redisClient.select(database);
      // eslint-disable-next-line no-await-in-loop
      await redisClient.del(`publicId_${publicId}`);
    }
  }
}
