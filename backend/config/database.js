
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Garante que as variáveis de ambiente sejam carregadas

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: console.log 
    }
);

module.exports = sequelize;