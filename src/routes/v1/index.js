const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const cityRoutes = require('./city-routes');
const router = express.Router();

router.post('/airplanes', AirplaneMiddlewares.validateCreateRequest, AirplaneController.createAirplane);
router.get('/airplanes', AirplaneController.getAirplanes);
router.get('/airplanes/:id', AirplaneController.getAirplane);
router.delete('/airplanes/:id', AirplaneController.destroyAirplane);

router.use('/cities', cityRoutes);

module.exports = router;