const request = require('supertest');
const express = require('express');
const calendarRoutes = require('../routes/calendarRoutes');
const app = express();

app.use(express.json());
app.use('/api/calendar', calendarRoutes);

jest.mock('googleapis');

describe('Google Calendar API', () => {
  it('should list events', async () => {
    const response = await request(app).get('/api/calendar/events');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: '1',
        summary: 'Mock Event 1',
        location: 'Mock Location 1',
        description: 'Mock Description 1',
        start: { dateTime: '2023-12-31T10:00:00-07:00' },
        end: { dateTime: '2023-12-31T12:00:00-07:00' },
      },
    ]);
  });

  it('should create an event', async () => {
    const newEvent = {
      summary: 'New Event',
      location: 'Location',
      description: 'Event Description',
      start: { dateTime: '2023-12-31T10:00:00-07:00' },
      end: { dateTime: '2023-12-31T12:00:00-07:00' },
    };

    const response = await request(app)
      .post('/api/calendar/events')
      .send(newEvent);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: '2',
      summary: 'New Event',
      location: 'Location',
      description: 'Event Description',
      start: { dateTime: '2023-12-31T10:00:00-07:00' },
      end: { dateTime: '2023-12-31T12:00:00-07:00' },
    });
  });
});