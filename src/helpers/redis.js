import redisClient from 'configs/redis.config';

export async function setData(database, key, data) {
  await redisClient.select(database);
  await redisClient.set(key, data);
}

export async function getData(database, key) {
  await redisClient.select(database);
  const data = await redisClient.get(key);

  return data;
}
