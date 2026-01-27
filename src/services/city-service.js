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

module.exports = {
    createCity
}
