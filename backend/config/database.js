// backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Garante que as variáveis de ambiente sejam carregadas

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false // Opcional: desliga os logs de SQL no console
    }
);

module.exports = sequelize;