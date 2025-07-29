import NodeCache from 'node-cache';
import { redis } from '../config/redis.js';

const memoryCache = new NodeCache({ stdTTL: 60 });

export async function get(key) {
  const memVal = memoryCache.get(key);
  if (memVal) return memVal;
  const redisVal = await redis.get(key);
  if (redisVal) {
    memoryCache.set(key, JSON.parse(redisVal));
    return JSON.parse(redisVal);
  }
  return null;
}

export async function set(key, value, ttl = 60) {
  memoryCache.set(key, value, ttl);
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
}

export async function del(key) {
  memoryCache.del(key);
  await redis.del(key);
}