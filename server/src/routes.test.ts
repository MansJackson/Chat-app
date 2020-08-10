import { addUser } from './util';
import request from 'supertest';
import {server, app} from './index';

afterAll(() => {
  server.close();
})

describe('the routes', () => {
  describe('GET /api/users/:nickname', () => {
    it('should return an object with 2 properties, valid and message', () => {
      return request(app)
        .get('/api/users/erik')
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBeDefined();
          expect(res.body.valid).toBeDefined();
        });
    });
    it('valid should be true if the username is available', () => {
      return request(app)
        .get('/api/users/erik')
        .expect(200)
        .then((res) => {
          expect(res.body.valid).toBe(true);
        });
    });

    it('valid should be false if the username already is in use', () => {
      addUser('erik');
      return request(app)
        .get('/api/users/erik')
        .expect(409)
        .then((res) => {
          expect(res.body.valid).toBe(false);
        });
    });
  });
});