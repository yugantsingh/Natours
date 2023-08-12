const fs = require('fs');
// Building the API to send the Tours available to the client
// When getting post requests we need to use a middleware to recieve the req from the client
// This here is a simple middleware, but we can also create our own middlewares
// Middleware - Simply a function that can modify the incoming requests.
// Reading the API from the file in a synchronous way. Since it is executed only once
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// param middleware for checking the tour id
exports.checkID = (req, res, next, val) => {
  //If the Tour does not exist
  //We can add the code for updating the object
  const id = Number(req.params.id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Resource not found',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// Route Handlers
// Handling GET requests and returning all the Tours from the server
exports.getAllTours = (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// Handling GET requests with tour with specific IDs
exports.getTourByID = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  res.json({
    status: 'success',
    results: 1,
    data: {
      tour: tour,
    },
  });
};
// Handling POST requests and adding new tour in the file asynchronously
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updating Tour',
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};
