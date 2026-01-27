const {StatusCodes}=require('http-status-codes');

const {CityService}= require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * 
 *POST /cities
 *req-body{name:'city name'}
 */


async function createCity(req, res) {
    console.log('createCity called');
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        SuccessResponse.message = 'City created successfully';
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating city';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function getCities(req, res) {
    try {
        const cities = await CityService.getCities(req.query);
        SuccessResponse.data = cities;
        SuccessResponse.message = 'Successfully fetched cities';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while fetching cities';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function getCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.data = city;
        SuccessResponse.message = 'Successfully fetched city';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while fetching city';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function destroyCity(req, res) {
    try {
        const response = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = response;
        SuccessResponse.message = 'City deleted successfully';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while deleting city';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

async function updateCity(req, res) {
    try {
        const response = await CityService.updateCity(req.params.id, {
            name: req.body.name
        });
        SuccessResponse.data = response;
        SuccessResponse.message = 'City updated successfully';
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while updating city';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}