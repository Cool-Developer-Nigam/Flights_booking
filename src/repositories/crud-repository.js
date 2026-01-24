class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.error('Something went wrong in the Crud Repository: create method', error);
            throw error;
        }   
    }

    async destroy(data) {
        try {
           const response = await this.model.destroy({
                where: { id: data }
            });
            return response;
        } catch (error) {
            console.error('Something went wrong in the Crud Repository: destroy method', error);
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            console.error('Something went wrong in the Crud Repository: get method', error);
            throw error;
        }   
    }
    async getAll(filters = {}) {
        try {
            const response = await this.model.findAll({
                where: filters
            });
            return response;
        } catch (error) {
            console.error('Something went wrong in the Crud Repository: getAll method', error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: { id: id }
            });
            return response;
        } catch (error) {
            console.error('Something went wrong in the Crud Repository: update method', error);
            throw error;
        }
    }

}
module.exports = CrudRepository;