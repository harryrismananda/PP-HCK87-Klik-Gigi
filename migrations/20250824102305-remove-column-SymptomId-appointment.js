'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.removeColumn(`Appointments`, `SymptomId`, null)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(`Appointments`, `SymptomId`, Sequelize.INTEGER)
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
