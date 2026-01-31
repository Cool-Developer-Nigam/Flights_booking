const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');


const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');
const flightRoutes = require('./flight-routes');
const router = express.Router();

router.post('/airplanes', AirplaneMiddlewares.validateCreateRequest, AirplaneController.createAirplane);
router.get('/airplanes', AirplaneController.getAirplanes);
router.get('/airplanes/:id', AirplaneController.getAirplane);
router.delete('/airplanes/:id', AirplaneController.destroyAirplane);

router.use('/cities', cityRoutes);
router.use('/airports', airportRoutes);
router.put('/airplanes/:id', 
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.updateAirplane);

router.use('/flights', flightRoutes);

module.exports = router;