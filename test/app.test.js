const request = require('supertest');
const app = require('../index');

describe('GET /api/hello', () => {
  it('should return a hello message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello from Node.js API 👋');
  });
});
