const google = {
    auth: {
      OAuth2: jest.fn().mockImplementation(() => {
        return {
          setCredentials: jest.fn(),
          getToken: jest.fn().mockImplementation((code, callback) => {
            callback(null, { access_token: 'mock_access_token', refresh_token: 'mock_refresh_token' });
          }),
          generateAuthUrl: jest.fn().mockReturnValue('http://mock-auth-url'),
        };
      }),
    },
    calendar: jest.fn().mockReturnValue({
      events: {
        list: jest.fn().mockImplementation((params, callback) => {
          callback(null, {
            data: {
              items: [
                {
                  id: '1',
                  summary: 'Mock Event 1',
                  location: 'Mock Location 1',
                  description: 'Mock Description 1',
                  start: { dateTime: '2023-12-31T10:00:00-07:00' },
                  end: { dateTime: '2023-12-31T12:00:00-07:00' },
                },
              ],
            },
          });
        }),
        insert: jest.fn().mockImplementation((params, callback) => {
          callback(null, {
            data: {
              id: '2',
              summary: 'New Event',
              location: 'Location',
              description: 'Event Description',
              start: { dateTime: '2023-12-31T10:00:00-07:00' },
              end: { dateTime: '2023-12-31T12:00:00-07:00' },
            },
          });
        }),
      },
    }),
  };
  
  module.exports = { google };