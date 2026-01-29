'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE',
      });
    }
  }
  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false // Model number cannot be null we have created this that it will not be null in the database
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false // Capacity cannot be null we have created this that it will not be null in the database
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};