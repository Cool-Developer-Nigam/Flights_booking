const {StatusCodes} = require('http-status-codes');

const repositories = require('../repositories');
const {AirportRepository}= repositories;
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();
const CityRepository = repositories.CityRepository;
const cityRepository = new CityRepository();

async function createAirport(data){
    try {
        // ensure provided cityId exists to avoid FK constraint errors
        if(data.cityId){
            try {
                await cityRepository.get(data.cityId);
            } catch (err) {
                throw new AppError('The cityId you provided is invalid', StatusCodes.BAD_REQUEST);
            }
        }

        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
       // Log full error for debugging
       console.error('airport-service createAirport error:', error && error.name, error);

       // Sequelize validation errors
       if(error.name === 'SequelizeValidationError'){
        let explanation = [];
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
       }

       // Unique constraint (e.g. name or code already exists)
       if(error.name === 'SequelizeUniqueConstraintError'){
        let explanation = [];
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
       }

       // Foreign key constraint (safety net)
       if(error.name === 'SequelizeForeignKeyConstraintError'){
        console.error('Foreign key constraint error detail:', error);
        throw new AppError('Invalid reference provided (foreign key constraint)', StatusCodes.BAD_REQUEST);
       }

       // If it's already an AppError, rethrow it
       if (error instanceof AppError) {
           throw error;
       }

       // Unknown error - log and throw generic message
       console.error('Unknown error while creating airport:', error);
       throw new AppError('Cannot create airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }   
}

async function getAirports(filters){
    try {
        const airports = await airportRepository.getAll(filters);
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch airports',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }   
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not found',StatusCodes.NOT_FOUND)   ;
        }
        throw new AppError('Cannot fetch airport',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }       
}

async function destroyAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to delete is not found',StatusCodes.NOT_FOUND)   ;
        }
        throw new AppError('Cannot delete airport',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }
}

async function updateAirport(id, data){
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error) {
       if(error.name=='SequelizeValidationError'){
        let explanation =[];
        console.log(error);
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        });
        console.log(explanation);
        throw new AppError(explanation,StatusCodes.BAD_REQUEST);
       }
        throw new AppError('Cannot update airport',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}

