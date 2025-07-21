'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.ENUM('arrumacao', 'limpeza_completa'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'in_progress', 'completed', 'pending_approval'),
        defaultValue: 'pending',
        allowNull: false,
      },
      checklist: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      startedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      completedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      maintenance_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      maintenance_notes: {
        type: Sequelize.TEXT,
        allowNull: true,

      },
      // Chave estrangeira para Unit
      unitId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Units', // Nome da tabela de referência
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Se uma Unidade for deletada, suas tarefas também serão.
      },
      // Chave estrangeira para User (a faxineira)
      cleanerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Nome da tabela de referência
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Se um User for deletado, suas tarefas também serão.
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
    await queryInterface.dropTable('Tasks');
  }
};