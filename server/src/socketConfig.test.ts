import { getUsers } from './util';
import io from 'socket.io-client';
import http from 'http';
import ioBack from 'socket.io';
import socketConfig from './socketConfig';

interface IChatMessage {
  nickname: string,
  message: string,
  type: string,
}

let socket: SocketIOClient.Socket;
let socket2: SocketIOClient.Socket;
let httpServer: http.Server;
let ioServer: SocketIO.Server;

beforeAll((done) => {
  httpServer = http.createServer().listen(8080);
  ioServer = ioBack(httpServer);
  socketConfig(ioServer);
  socket = io.connect(`http://localhost:8080`);
  socket2 = io.connect(`http://localhost:8080`);
  socket.on('connect', () => {
    socket.emit('nickname', 'johan');
  });
  setTimeout(() => {
    socket2.on('connect', () => {
      socket.emit('nickname', 'johanna');
    });
    done();
  }, 100)
});

afterAll((done) => {
  if (socket.connected) socket.close();
  if (socket2.connected) socket2.close();
  ioServer.close();
  httpServer.close();
  done();
});

describe('the server side socket', () => {
  it('should communicate', (done) => {
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message: string) => {
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });

  it('should add nickname to users when nickname is emitted', (done) => {
    expect(getUsers()).toContain('johan');
    done();
  });
  it('should broadcast chat messages too all connected clients', (done) => {
    socket.emit('send-chat-message', { nickname: 'johan', message: 'hejsan' });
    socket2.once('chat-message', (message: IChatMessage) => {
      expect(message).toEqual({
        nickname: 'johan',
        message: 'hejsan',
        type: 'recieved'
      });
      done();
    });
  });

  it('should broadcast messages on connect and disconnect', (done) => {
    socket.disconnect();
    socket2.once('chat-message', (message: IChatMessage) => {
      expect(message).toEqual({
        nickname: 'johan',
        message: 'left the chat',
        type: 'disconnect'
      });
    });
    setTimeout(() => {
      socket.connect();
      socket2.once('chat-message', (message: IChatMessage) => {
        expect(message).toEqual({
          nickname: 'johan',
          message: 'joined the chat',
          type: 'connect',
        });
        done();
      });
    }, 50)
  })
});