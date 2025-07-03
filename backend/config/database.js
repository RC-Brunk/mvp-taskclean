// backend/config/database.js

require('dotenv').config(); // Carrega variáveis de ambiente do .env

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nome do banco de dados (ex: mvptaskclean_db)
    process.env.DB_USER,      // Usuário do banco de dados (ex: postgres)
    process.env.DB_PASSWORD,  // Senha do banco de dados
    {
        host: process.env.DB_HOST, // Host do banco de dados (ex: 'db' para Docker)
        dialect: 'postgres',       // Define o dialeto do banco de dados
        logging: false,            // Opcional: define se quer ver os logs SQL no console
        dialectOptions: {          // Opções específicas do dialeto (para conexão via Docker)
            connectTimeout: 60000  // Aumenta o timeout para conexão (60 segundos)
        }
    }
);

module.exports = sequelize;