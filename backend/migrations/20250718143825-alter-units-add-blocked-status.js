'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alterar um ENUM existente é mais seguro com SQL puro
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Units_status" ADD VALUE 'blocked';
    `);
  },

  async down(queryInterface, Sequelize) {
    // Reverter um ENUM é complexo e destrutivo.
    // Em um cenário real, isso exigiria uma estratégia cuidadosa.
    // Por enquanto, apenas logamos uma mensagem.
    console.log("Reverter a adição de um valor a um ENUM não é suportado diretamente e pode exigir a recriação do tipo.");
    return Promise.resolve();
  }
};