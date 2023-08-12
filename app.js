const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const morgan = require('morgan');

// Using Morgan for Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //HTTP request logger for Express Node.js
}
app.use(express.json());

// Servng Static files using Static middleware layer
app.use(express.static(`${__dirname}/public`));

// Routers
// This is called mounting the router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
