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
        throw new AppError('Cannot fetch airplanes',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }   
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not found',StatusCodes.NOT_FOUND)   ;
        }
        throw new AppError('Cannot fetch airplane',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }       
}

async function destroyAirplane(id){
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not found',StatusCodes.NOT_FOUND)   ;
        }
        throw new AppError('Cannot delete airplane',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}

