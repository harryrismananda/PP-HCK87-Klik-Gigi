'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require(`bcryptjs`)
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Patient, { foreignKey: "UserId"})
      User.hasOne(models.Doctor, { foreignKey: "UserId"})
    }
  }
  User.init({
    email:DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,option)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
  })



  return User;
};