// const {StatusCodes} = require('http-status-codes');

// const {AirplaneService} = require('../services');


// async function createAirplane(req, res) {
//     console.log('createAirplane called');
//     try {
//         const airplane = await AirplaneService.createAirplane({
//             modelNumber: req.body.modelNumber,
//             capacity: req.body.capacity
//         });
//         return res
//         .status(StatusCodes.CREATED)
//         .json({
//             success: true,
//             message: 'Airplane created successfully',
//             data: airplane,
//             error: {}
//         });
//     } catch (error) {
//         return res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({
//             success: false,
//             message: 'Something went wrong while creating airplane',
//             data: {},
//             error: error
//         });
//     }
// }
// async function getAirplanes(req, res) {
//     try {
//         const airplanes = await AirplaneService.getAirplanes(req.query);
//         return res
//         .status(StatusCodes.OK)
//         .json({
//             success: true,
//             message: 'Successfully fetched airplanes',
//             data: airplanes,
//             error: {}
//         });
//     } catch (error) {
//         return res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({
//             success: false,
//             message: 'Something went wrong while fetching airplanes',
//             data: {},
//             error: error
//         });
//     }
// }

// module.exports = {
//     createAirplane,
//     getAirplanes
// }

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

module.exports = {
    createAirplane,
    getAirplanes
};