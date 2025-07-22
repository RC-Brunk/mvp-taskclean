'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'checklistTemplateId', {
      type: Sequelize.UUID,
      allowNull: true, // A tarefa pode não ter um template
      references: {
        model: 'ChecklistTemplates', // Nome da tabela de referência
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL' // Se um template for deletado, a tarefa não será, apenas o link
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'checklistTemplateId');
  }
};