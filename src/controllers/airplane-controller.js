const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createAirplane(req, res) {
    console.log('createAirplane called');
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        SuccessResponse.message = 'Airplane created successfully';
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating airplane';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes(req.query);
        SuccessResponse.data = airplanes;
        SuccessResponse.message = 'Successfully fetched airplanes';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while fetching airplanes';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

/**
 *POST /airplanes/:id
  */

async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        SuccessResponse.message = 'Successfully fetched airplane';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while fetching airplane';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

/**DELETE /airplanes/:id
  */

async function destroyAirplane(req, res) {
    try {
        const response = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = response;
        SuccessResponse.message = 'Airplane deleted successfully';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while deleting airplane';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function updateAirplane(req, res) {
    try {
        const response = await AirplaneService.updateAirplane(req.params.id, {
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = response;
        SuccessResponse.message = 'Airplane updated successfully';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while updating airplane';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};