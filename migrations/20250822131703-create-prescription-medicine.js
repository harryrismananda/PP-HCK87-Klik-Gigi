'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PrescriptionMedicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PrescriptionId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Prescriptions`,
          key: `id`
        }
      },
      MedicineId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Medicines`,
          key: `id`
        }
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
    await queryInterface.dropTable('PrescriptionMedicines');
  }
};