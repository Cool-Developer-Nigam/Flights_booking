const {StatusCodes} = require('http-status-codes');

const {AirplaneRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
       if(error.name=='sequelizeValidationError'){
        let explanation =[];
        console.log(error);
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        });
        console.log(explanation);
        throw new AppError('Cannot create airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
       }
        throw new AppError('Cannot create airplane object',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }   
}

async function getAirplanes(filters){
    try {
        const airplanes = await airplaneRepository.getAll(filters);
        return airplanes;
    } catch (error) {
        throw error;
    }   
}

module.exports = {
    createAirplane,
    getAirplanes
}