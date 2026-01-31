const express = require('express');

const { FlightController } = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares');

const router = express.Router();

//  /api/v1/flights POST
router.post('/', 
    FlightMiddlewares.validateCreateRequest, 
    FlightController.createFlight);


//  /api/v1/flights GET
router.get('/', FlightController.getFlights);

//  /api/v1/flights/:id GET
router.get('/:id', FlightController.getFlight);

//  /api/v1/flights/:id DELETE
router.delete('/:id', FlightController.destroyFlight);

//  /api/v1/flights/:id PUT
router.put('/:id', 
    FlightMiddlewares.validateCreateRequest,
    FlightController.updateFlight);

module.exports = router;