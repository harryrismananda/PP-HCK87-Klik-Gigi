'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrescriptionMedicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PrescriptionMedicine.init({
    PrescriptionId: DataTypes.INTEGER,
    MedicineId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PrescriptionMedicine',
  });
  return PrescriptionMedicine;
};