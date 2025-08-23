'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Prescription.belongsToMany(models.Medicine, { through: 'PrescriptionMedicine' });
    }
  }
  Prescription.init({
    AppointmentId: DataTypes.INTEGER,
    instruction: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Prescription',
  });
  return Prescription;
};