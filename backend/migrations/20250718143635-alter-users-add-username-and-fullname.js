'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adiciona as novas colunas
    await queryInterface.addColumn('Users', 'fullName', {
      type: Sequelize.STRING,
      allowNull: false,
      before: 'username' // Opcional: coloca a coluna antes de 'username'
    });
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      before: 'password'
    });

    // Remove a coluna antiga
    await queryInterface.removeColumn('Users', 'email');
  },

  async down(queryInterface, Sequelize) {
    // Para reverter, fazemos o processo inverso
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.removeColumn('Users', 'username');
    await queryInterface.removeColumn('Users', 'fullName');
  }
};