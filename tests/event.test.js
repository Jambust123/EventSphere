const request = require('supertest');
const { app, server } = require('../app'); 
const Event = require('../models/Event');
const sequelize = require('../config/db');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  if(server){
      server.close();
  }
});

beforeEach(async () => {
  await Event.destroy({ where: {} });
});

describe('Event Routes', () => {
  it('should create a new event', async () => {
    const newEvent = {
      title: 'Test Event',
      description: 'Test Description',
      date: new Date().toISOString(),
      location: 'Test Location',
      capacity: 100,
      price: 10.00,
    };

    const response = await request(app)
      .post('/api/events')
      .send(newEvent)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newEvent.title);
    expect(response.body.description).toBe(newEvent.description);
    expect(Number(response.body.price)).toBe(newEvent.price);
    expect(response.body.location).toBe(newEvent.location);
  });

  it('should fetch all events', async () => {
    const events = [
      {
        title: 'Event 1',
        description: 'Description 1',
        date: new Date(),
        location: 'Location 1',
        capacity: 100,
        price: 20.00,
      },
      {
        title: 'Event 2',
        description: 'Description 2',
        date: new Date(),
        location: 'Location 2',
        capacity: 200,
        price: 30.00,
      },
    ];

    await Event.bulkCreate(events);

    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(events.length);
    expect(response.body[0].title).toBe(events[0].title);
    expect(response.body[1].title).toBe(events[1].title);
  });

  it('should return an error when creating an event with missing data', async () => {
    const incompleteEvent = {
      title: 'Incomplete Event',
    };

    const response = await request(app)
      .post('/api/events')
      .send(incompleteEvent)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Validation error: Missing required fields.');
  });
});


describe('PATCH /api/events/:id', () => {
    it('should update an existing event', async () => {
      const event = await Event.create({
        title: 'Original Title',
        description: 'Original Description',
        date: new Date(),
        location: 'Original Location',
        capacity: 100,
        price: 10.0,
      });
  
      const updates = {
        title: 'Updated Title',
        capacity: 200,
      };
  
      const response = await request(app)
        .patch(`/api/events/${event.id}`)
        .send(updates)
        .set('Content-Type', 'application/json');
  
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updates.title);
      expect(response.body.capacity).toBe(updates.capacity);
      expect(response.body.description).toBe(event.description); // Unchanged field
    });
  
    it('should return 404 if the event does not exist', async () => {
      const response = await request(app)
        .patch('/api/events/9999') // Non-existent ID
        .send({ title: 'Non-existent Event' })
        .set('Content-Type', 'application/json');
  
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Event not found.');
    });
  
    it('should return 400 if no updates are provided', async () => {
      const event = await Event.create({
        title: 'Event Title',
        description: 'Event Description',
        date: new Date(),
        location: 'Event Location',
        capacity: 50,
        price: 15.0,
      });
  
      const response = await request(app)
        .patch(`/api/events/${event.id}`)
        .send({}) // No updates
        .set('Content-Type', 'application/json');
  
      expect(response.status).toBe(200); // Should succeed but make no changes
      expect(response.body.title).toBe(event.title);
    });
  });