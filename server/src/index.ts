import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import indexRoutes from './routes/index';
import { clearUsers, logToFile } from './util';
import socketConfig from './socketConfig';

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../', 'logs', 'access.log'), { flags: 'a' });
socketConfig(io);

const shutDown = () => {
  io.sockets.emit('shut-down', 'The server has been shut down');
  io.close();
  server.close();
  clearUsers();
  logToFile('server was shut down', 'connection.log');
  process.exit();
};

app.use(morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :url :status :response-time ms - :res[content-length]',
  { stream: accessLogStream },
));
app.use('/api', indexRoutes);

process.on('SIGINT', () => {
  shutDown();
});

process.on('SIGTERM', () => {
  shutDown();
});

server.listen(PORT);
