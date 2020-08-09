import { Server, Namespace } from 'socket.io';
import { removeUser, addUser, logToFile } from './util';

const disconnectTime = 120;

export default (io: Server): Namespace => io.on('connection', (socket: SocketIO.Socket) => {
  let timeSilent = 0;
  let name: string;
  let disconnectMessage: string;

  const interval = setInterval(() => {
    if (timeSilent > disconnectTime) {
      disconnectMessage = 'was disconnected due to inactivity';
      socket.emit('timeout', { message: 'You were disconnected due to inactivity' });
      socket.disconnect();
    } else timeSilent += 1;
  }, 1000);

  socket.on('disconnect', () => {
    logToFile(`${socket.handshake.address} - ${name} disconnected`, 'connection.log');
    socket.broadcast.emit(
      'chat-message',
      { nickname: name, message: disconnectMessage || 'left the chat', type: 'disconnect' },
    );
    removeUser(name);
    disconnectMessage = null;
    clearInterval(interval);
  });

  socket.on('nickname', (nickname: string) => {
    name = nickname;
    logToFile(`${socket.handshake.address} - ${name} connected`, 'connection.log');
    socket.broadcast.emit(
      'chat-message',
      { nickname: name, message: 'joined the chat', type: 'connect' },
    );
    addUser(name.toLowerCase());
  });

  socket.on('send-chat-message', ({ message }) => {
    logToFile(`${socket.handshake.address} - ${name}: ${message}`, 'messages.log');
    timeSilent = 0;
    socket.broadcast.emit('chat-message', { nickname: name, message, type: 'recieved' });
  });
});
