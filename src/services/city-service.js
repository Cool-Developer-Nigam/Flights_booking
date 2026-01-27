const {StatusCodes}=require('http-status-codes');

const repositories = require('../repositories');
const AppError = require('../utils/errors/app-error');

const CityRepository = repositories.CityRepository;
const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        
         if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
        let explanation =[];
        console.log(error);
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        }
        );
        console.log(explanation);
        throw new AppError(explanation,StatusCodes.BAD_REQUEST);
       }
        throw new AppError('Cannot create city object',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }
}

async function getCities(filters){
    try {
        const cities = await cityRepository.getAll(filters);
        return cities;
    } catch (error) {
        throw new AppError('Cannot fetch cities',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }   
}

async function getCity(id){
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested is not found',StatusCodes.NOT_FOUND)   ;
        }
        throw new AppError('Cannot fetch city',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }       
}

async function destroyCity(id){
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to delete is not found',StatusCodes.NOT_FOUND)   ;
        }
        throw new AppError('Cannot delete city',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }
}

async function updateCity(id, data){
    try {
        const response = await cityRepository.update(id, data);
        return response;
    } catch (error) {
       if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
        let explanation =[];
        console.log(error);
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        });
        console.log(explanation);
        throw new AppError(explanation,StatusCodes.BAD_REQUEST);
       }
        throw new AppError('Cannot update city',StatusCodes.INTERNAL_SERVER_ERROR)   ;
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}
