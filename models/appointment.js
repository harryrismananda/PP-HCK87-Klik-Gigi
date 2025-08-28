"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get scheduleFormat() {
      return new Date(this.scheduledAt).toLocaleDateString(`en-EN`, {
        weekday: "long",
        year: "numeric",
        day: "numeric",
        month: "long",
      });
    }

    static validation(arr){
      
      let err = ["","",""]
      arr.forEach(element => {
        if (element.path === "DoctorId") {
          err[0] = element.message
        }
        
        if (element.path === "scheduledAt") {
          err[1] = element.message
        }
        
        if (element.path === "SymptomId") {
          err[2] = element.message
        }
        
      });
      return err
    }


    static async findAppointment(where){
      try {
        const options = {include:[{model: sequelize.models.Symptom}, {model: sequelize.models.Patient, include: sequelize.models.User}, {model: sequelize.models.Doctor, include:sequelize.models.User}]}
        if (where) {
        options.where = {id: where}
        return await Appointment.findOne(options)  
        }
        
      } catch (error) {
        throw error
      }
    }

    static associate(models) {
      Appointment.hasOne(models.Prescription, { foreignKey: "AppointmentId" });
      Appointment.belongsTo(models.Patient, { foreignKey: "PatientId" });
      Appointment.belongsTo(models.Doctor, { foreignKey: "DoctorId" });
      Appointment.belongsToMany(models.Symptom, {
        through: `AppointmentSymptoms`,
      });
    }
  }
  Appointment.init(
    {
      PatientId: DataTypes.INTEGER,
      DoctorId: {type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {msg: `Please Choose Your Doctor!`},
          notEmpty: {msg: `Please Choose Your Doctor!`}
        }
      },
      scheduledAt: {type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {msg: `Please Choose Appointment Date!`},
          notEmpty: {msg: `Please Choose Appointment Date!`},
          isAfter:{
            args: new Date().toISOString().split("T")[0],
            msg: `Please choose a valid date`
          }
        }
      },
      notes: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
