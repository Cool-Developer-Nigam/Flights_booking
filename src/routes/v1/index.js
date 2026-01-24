// const express = require('express');

// const { InfoController } = require('../../controllers');

// const airplaneRoutes = require('./airplane-routes');

// const router = express.Router();


// router.use('/airplanes', airplaneRoutes);
// router.get('/info', InfoController.info);

// module.exports = router;

const express = require('express');

const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');
const router = express.Router();

router.post('/airplanes', AirplaneMiddlewares.validateCreateRequest, AirplaneController.createAirplane);
router.get('/airplanes', AirplaneController.getAirplanes);

module.exports = router;