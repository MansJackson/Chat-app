import { addUser, getUsers } from './util';
import server from './index';
import request from 'supertest';
import io from 'socket.io-client';
import http from 'http';
import ioBack from 'socket.io';
import socketConfig from './socketConfig';

let socket: SocketIOClient.Socket;
let httpServer: http.Server;
let ioServer: SocketIO.Server;

describe('the routes', () => {
  describe('GET /api/users/:nickname', () => {
    it('should return an object with 2 properties, valid and message', () => {
      return request(server)
        .get('/api/users/erik')
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBeDefined();
          expect(res.body.valid).toBeDefined();
        });
    });
    it('valid should be true if the username is available', () => {
      return request(server)
        .get('/api/users/erik')
        .expect(200)
        .then((res) => {
          expect(res.body.valid).toBe(true);
        });
    });

    it('valid should be false if the username already is in use', () => {
      addUser('erik');
      return request(server)
        .get('/api/users/erik')
        .expect(409)
        .then((res) => {
          expect(res.body.valid).toBe(false);
        });
    });
  });
});

beforeAll((done) => {
  httpServer = http.createServer().listen(8080);
  ioServer = ioBack(httpServer);
  socketConfig(ioServer);
  done();
});

afterAll((done) => {
  ioServer.close();
  httpServer.close();
  done();
});

beforeEach((done) => {
  socket = io.connect(`http://localhost:8080`);
  socket.on('connect', () => {
    socket.emit('nickname', 'johan');
    done();
  });
});

afterEach((done) => {
  if (socket.connected) {
    socket.disconnect();
  }
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
});