'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Patients`,
          key: `id`
        }
      },
      DoctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Doctors`,
          key: `id`
        }
      },
      SymptomId: {
        type: Sequelize.INTEGER
      },
      scheduledAt: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};