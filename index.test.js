const request = require('supertest');
const app = require('./src/app');

describe('POST /musicians', () => {
  it('should return an error if name is missing', async () => {
    const response = await request(app)
      .post('/musicians')
      .send({ instrument: 'Guitar' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        location: "body",
        msg: "Name is required and cannot be empty or whitespace",
        path: "name",
        type: "field",
        value: ""
      }
    ]);
  });

  it('should return an error if instrument is missing', async () => {
    const response = await request(app)
      .post('/musicians')
      .send({ name: 'John Doe' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        location: "body",
        msg: "Instrument is required and cannot be empty or whitespace",
        path: "instrument",
        type: "field",
        value: ""
      }
    ]);
  });

  it('should return an error if both name and instrument are missing', async () => {
    const response = await request(app)
      .post('/musicians')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual([
      {
        location: "body",
        msg: "Name is required and cannot be empty or whitespace",
        path: "name",
        type: "field",
        value: ""
      },
      {
        location: "body",
        msg: "Instrument is required and cannot be empty or whitespace",
        path: "instrument",
        type: "field",
        value: ""
      }
    ]);
  });

  it('should add a new musician if all fields are valid', async () => {
    const response = await request(app)
      .post('/musicians')
      .send({ name: 'John Doe', instrument: 'Guitar' });

    expect(response.statusCode).toBe(201);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('John Doe');
    expect(response.body[0].instrument).toBe('Guitar');
  });
});