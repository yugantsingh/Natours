const express = require('express');
const fs = require('fs');
const app = express();

const morgan = require('morgan');
// Building the API to send the Tours available to the client

// When getting post requests we need to use a middleware to recieve the req from the client
// This here is a simple middleware, but we can also create our own middlewares
// Middleware - Simply a function that can modify the incoming requests.

// Using Morgan for Middleware
app.use(morgan('dev')); //HTTP request logger for Express Node.js
app.use(express.json());

// Reading the API from the file in a synchronous way. Since it is executed only once
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Handling GET requests and returning all the Tours from the server
const getAllTours = (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// Handling GET requests with tour with specific IDs
const getTourByID = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  //If the Tour does not exist
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      messgae: 'Invalid Tour ID',
    });
  }
  res.json({
    status: 'success',
    results: 1,
    data: {
      tour: tour,
    },
  });
};
// Handling POST requests and adding new tour in the file asynchronously
const createTour = (req, res) => {
  // console.log(req.body);
  const newID = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        results: tours.length,
        data: {
          tours,
        },
      });
    }
  );
};
//Handling PATCH requests to update the data
//Dummy PATCH method implementation
const updateTour = (req, res) => {
  const id = Number(req.params.id);
  console.log(req.body);
  //We can add the code for updating the object
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Resource not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updating Tour',
    },
  });
};
const deleteTour = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};

const getUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};

const createUser = (req, res) => {
  // console.log(req.body);
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};
// Defining Routes Individually

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTourByID);
// app.patch('/api/v1/tours/:id', updateTour);

// We can also chain the routes by using the route functionality in Express

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUserByID)
  .patch(updateUser)
  .delete(deleteUser);
