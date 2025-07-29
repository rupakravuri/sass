export default function registerOrderEvents(io, socket) {
  socket.on('order:join', (orderId) => {
    socket.join(`order:${orderId}`);
  });

  socket.on('order:update', ({ orderId, data }) => {
    io.to(`order:${orderId}`).emit('order:updated', data);
  });
}