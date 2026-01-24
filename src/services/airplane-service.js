const {AirplaneRepository}= require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
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