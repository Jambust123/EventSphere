const authorize = require('./googleAuth');

authorize().then(() => {
  console.log('Authorization complete.');
}).catch((error) => {
  console.error('Error during authorization:', error);
});