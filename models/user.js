"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Patient, { foreignKey: "UserId" });
      User.hasOne(models.Doctor, { foreignKey: "UserId" });
    }

    static async validation(arr) {
      let err = ["", "", ""];
      arr.forEach((el) => {
        if (el.path === "name") {
          err[0] = el.message;
        }
        if (el.path === "password") {
          err[1] = el.message;
        }
        if (el.path === "email") {
          err[2] = el.message;
        }
      });
      return err;
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email has been used" },
        validate: {
          notNull: {
            msg: `Email must not be empty!`,
          },
          notEmpty: {
            msg: `Email must not be empty!`,
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Name must not be empty!`,
          },
          notEmpty: {
            msg: `Name must not be empty!`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password must not be empty!`,
          },
          notEmpty: {
            msg: `Password must not be empty!`,
          },
          minimumLength(value) {
            if (value.length < 8) {
              throw new Error(`Minimum password length is 8!`);
            }
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(hashPassword);
  User.afterCreate(async (user) => {
    if (user.role === "Patient") {
      await user.createPatient();
    } 
    
    if(user.role === "Doctor") {
      await user.createDoctor()
    }
  });

  return User;
};
