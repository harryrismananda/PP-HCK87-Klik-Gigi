'use strict';
const {
  Model
} = require('sequelize');
const { licenseNumberHook } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.User, { foreignKey: "UserId" })
      Doctor.hasMany(models.Appointment, { foreignKey: "DoctorId" })
    }
  }
  Doctor.init({
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: `Specialization must not be empty`
        },
        notEmpty:{
          msg: `Specialization must not be empty`
        }
      }
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: `License Number must not be empty`
        },
        notEmpty:{
          msg: `License Number must not be empty`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });

  Doctor.beforeCreate(licenseNumberHook)
  Doctor.beforeUpdate(licenseNumberHook)

  return Doctor;
};