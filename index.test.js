const request = require('supertest');
const app = require('./server');

describe('Musicians API', () => {
  let musicianId;

  it('should create a new musician', async () => {
    const res = await request(app)
      .post('/api/musicians')
      .send({ name: 'John Doe', instrument: 'Guitar', genre: 'Rock' });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    musicianId = res.body._id;
  });

  it('should get all musicians', async () => {
    const res = await request(app).get('/api/musicians');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a musician by ID', async () => {
    const res = await request(app).get(`/api/musicians/${musicianId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(musicianId);
  });

  it('should update a musician by ID', async () => {
    const res = await request(app)
      .put(`/api/musicians/${musicianId}`)
      .send({ genre: 'Pop' });
    
    expect(res.status).toBe(200);
    expect(res.body.genre).toBe('Pop');
  });

  it('should delete a musician by ID', async () => {
    const res = await request(app).delete(`/api/musicians/${musicianId}`);
    expect(res.status).toBe(204);
  });
});
