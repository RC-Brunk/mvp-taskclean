// backend/migrations/<timestamp>-create-units-table.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Units', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nome da unidade, ex: "Quarto 201" ou "Apartamento 10B"'
      },
      description: { // Campo 'description' conforme o seu Unit.js
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Descrição ou notas sobre a unidade.'
      },
      status: { // ENUM 'status' conforme o seu Unit.js
        type: Sequelize.ENUM('clean', 'dirty', 'in_progress'),
        allowNull: false,
        defaultValue: 'dirty',
        comment: 'Status atual da limpeza da unidade.'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Units');
  }
};