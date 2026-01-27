const express = require('express');

const { AirplaneController } = require('../../controllers');
const {AirplaneMiddleware} = require('../../middlewares');
const router = express.Router();

router.post('/airplanes', 
    AirplaneMiddleware.validateCreateAirplane, 
    AirplaneController.createAirplane);
    
router.get('/airplanes', AirplaneController.getAirplanes);

module.exports = router;