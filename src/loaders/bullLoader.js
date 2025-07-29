import { queues } from '../jobs/queues.js';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter.js';
import express from 'express';

export default function bullLoader(app) {
  const serverAdapter = new (createBullBoard).ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const bullQueues = Object.values(queues).map((q) => new BullAdapter(q));
  createBullBoard({ queues: bullQueues, serverAdapter });

  const router = express.Router();
  router.use(serverAdapter.getRouter());
  app.use('/admin/queues', router);
}