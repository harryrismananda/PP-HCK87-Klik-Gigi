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
      DoctorId: DataTypes.INTEGER,
      scheduledAt: DataTypes.DATE,
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
