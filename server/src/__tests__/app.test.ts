import request from 'supertest';
import { createApp } from '../app';

describe('createApp', () => {
  const app = createApp();

  it('GET / returns API metadata', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Suni API/i);
  });

  it('rejects product list queries with invalid pagination', async () => {
    const response = await request(app).get('/api/products?page=0&limit=500');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('strips NoSQL injection operators from JSON body on auth route', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: { $gt: '' }, password: 'x' });
    expect(response.status).toBe(400);
  });
});
