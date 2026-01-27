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

module.exports = {
    createCity
}