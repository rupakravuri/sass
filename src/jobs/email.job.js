import { emailQueue } from './queues.js';

export const enqueueEmail = async (payload) => {
  await emailQueue.add(payload, { attempts: 3, backoff: 5000 });
};