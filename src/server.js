import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import config from './config/index.js';
import socketLoader from './loaders/socketLoader.js';
import logger from './utils/logger.js';

const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

socketLoader(io); // configure namespaces/events

server.listen(config.port, () => {
  logger.info(`🚀 Server running on ${config.env} at http://localhost:${config.port}`);
});

// graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down...');
  server.close(() => process.exit(0));
});