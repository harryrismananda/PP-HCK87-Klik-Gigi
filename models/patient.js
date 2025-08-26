"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.belongsTo(models.User, { foreignKey: "UserId" });
      Patient.hasMany(models.Appointment, { foreignKey: "PatientId" });
    }
  }
  Patient.init(
    {
      gender: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: {
            msg: `Gender must not be empty`,
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,

        validate: {
          notEmpty: {
            msg: `Age must not be empty`,
          },
          min: {
            args: 1,
            msg: `Age cannot be negative number!`,
          },
        },
      },
      bloodType: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: {
            msg: `Blood Type must not be empty`,
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
