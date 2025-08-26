'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AppointmentSymptoms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AppointmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Appointments`,
          key: `id`
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      SymptomId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Symptoms`,
          key: `id`
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('AppointmentSymptoms');
  }
};