const express = require('express');

const { AirplaneController } = require('../../controllers');
const router = express.Router();

router.post('/airplanes', AirplaneController.createAirplane);
router.get('/airplanes', AirplaneController.getAirplanes);

module.exports = router;