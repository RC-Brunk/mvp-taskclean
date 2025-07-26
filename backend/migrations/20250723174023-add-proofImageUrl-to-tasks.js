'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'proofImageUrl', {
      type: Sequelize.STRING,
      allowNull: true, // Começa como nulo, preenchido após o upload
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'proofImageUrl');
  }
};