import Bull from 'bull';
import config from '../config/index.js';

export const emailQueue = new Bull('emailQueue', {
  redis: { host: config.redis.host, port: config.redis.port, db: config.redis.db }
});

emailQueue.process(async (job) => {
  // send email here
});

export const queues = { emailQueue };