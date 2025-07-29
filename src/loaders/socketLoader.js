import { createAdapter } from '@socket.io/redis-adapter';
import { redis, redisSubscriber } from '../config/redis.js';
import registerOrderEvents from '../sockets/order.events.js';

export default function socketLoader(io) {
  io.adapter(createAdapter(redis, redisSubscriber));

  io.on('connection', (socket) => {
    // auth handshake if needed
    // const token = socket.handshake.auth?.token;
    registerOrderEvents(io, socket);
  });
}