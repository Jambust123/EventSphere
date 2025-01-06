const request = require('supertest');
const app = require('../app.js');

describe('GET /events', () => {
    test('returns a list of events', async () => {
        const response = await request(app).get('/events');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    
    
});