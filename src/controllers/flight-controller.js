const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * 
 *POST /flights
 *req-body { flightNumber, airplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats }
  */
 
async function createFlight(req, res) {
    console.log('createFlight called');
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        SuccessResponse.message = 'Flight created successfully';
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Something went wrong while creating flight';
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
}


async function getFlights(req, res) {
    return res.status(200).json({ message: 'getFlights not implemented' });
}

async function getFlight(req, res) {
    return res.status(200).json({ message: 'getFlight not implemented' });
}

async function destroyFlight(req, res) {
    return res.status(200).json({ message: 'destroyFlight not implemented' });
}

async function updateFlight(req, res) {
    return res.status(200).json({ message: 'updateFlight not implemented' });
}

module.exports = {
    createFlight,
    getFlights,
    getFlight,
    destroyFlight,
    updateFlight
};