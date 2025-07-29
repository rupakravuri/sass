import Redis from 'ioredis';
import config from './index.js';

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  db: config.redis.db
});

export const redisSubscriber = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  db: config.redis.db
});