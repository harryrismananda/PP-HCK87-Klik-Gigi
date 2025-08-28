'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static validation (arr) {
      
      let err = ["",""]
      arr.forEach(element => {
        if (element.path === "specialization") {
          err[0] = element.message
        }
        
        if (element.path === "licenseNumber") {
          err[1] = element.message
        }
        
      });
      return err
    }


    static associate(models) {
      Doctor.belongsTo(models.User, { foreignKey: "UserId" })
      Doctor.hasMany(models.Appointment, { foreignKey: "DoctorId" })
    }
  }
  Doctor.init({
    specialization: {
      type: DataTypes.STRING,
      
      validate:{
        
        notEmpty:{
          msg: `Specialization must not be empty`
        }
      }
    },
    licenseNumber: {
      type: DataTypes.STRING,
      
      validate:{
        
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

 

  return Doctor;
};