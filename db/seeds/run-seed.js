const db = require('../connection');
const seed = require('./seed');

const runSeed = async () => {
  try {
    await seed();
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    db.end();
  }
};

runSeed();