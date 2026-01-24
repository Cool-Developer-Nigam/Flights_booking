const {StatusCodes} = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');
function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Model Number is required',
            data: {},
            error: { explanation: 'Model Number not found in the request body' }
        });
    }
    if (!req.body.capacity) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Capacity is required',
            data: {},
            error: { explanation: 'Capacity not found in the request body' }
        });
    }
    next();
}

module.exports = {
    validateCreateRequest
}