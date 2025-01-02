const request = require('supertest');
const app = require('../app');

describe('Events API', () => {
  // GET /events
  it('should fetch all events', async () => {
    const response = await request(app).get('/events');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('events');
  });

  // GET /events/:id
  it('should fetch a specific event by ID', async () => {
    const validId = 'test-id'; // Replace with an actual test ID
    const response = await request(app).get(`/events/${validId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('event');
  });

  it('should return 404 for non-existent event ID', async () => {
    const response = await request(app).get('/events/non-existent-id');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Could not find event for id non-existent-id');
  });

  // POST /events
  it('should add a new event', async () => {
    const newEvent = {
      title: 'Test Event',
      description: 'Test Description',
      date: '2025-01-15',
      image: 'http://example.com/image.jpg',
    };
    const response = await request(app).post('/events').send(newEvent);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Event saved.');
  });

  it('should return 422 for invalid event data', async () => {
    const invalidEvent = { title: '' };
    const response = await request(app).post('/events').send(invalidEvent);
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty('errors');
  });

  // PATCH /events/:id
  it('should update an existing event', async () => {
    const updatedEvent = {
      title: 'Updated Event',
      description: 'Updated Description',
      date: '2025-01-20',
      image: 'http://example.com/updated-image.jpg',
    };
    const validId = 'test-id'; // Replace with an actual test ID
    const response = await request(app).patch(`/events/${validId}`).send(updatedEvent);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Event updated.');
  });

  // DELETE /events/:id
  it('should delete an event', async () => {
    const validId = 'test-id'; // Replace with an actual test ID
    const response = await request(app).delete(`/events/${validId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Event deleted.');
  });

  it('should return 404 for deleting a non-existent event', async () => {
    const response = await request(app).delete('/events/non-existent-id');
    expect(response.statusCode).toBe(404);
  });
});
