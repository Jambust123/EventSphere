process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 
require('dotenv').config(); 

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); 
const eventRoutes = require('./routes/eventRoutes'); 

const app = express();


if (process.env.NODE_ENV === 'development') {
  console.log('Environment Variables:', process.env);
}

app.use(bodyParser.json());


app.use('/api/events', eventRoutes);


(async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate(); 
    console.log('Database connected successfully.');


    await sequelize.sync({ alter: true }); 
    console.log('Database models synchronized.');


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
})();
