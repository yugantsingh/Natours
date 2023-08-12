const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// Param Middleware
router.param('id', tourController.checkID);

// Create a checkBody Middleware
// Check if body contains the name and the price property
// if not send 400 status code (bad request)
// Add it to post handler stack

// Routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourByID)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
