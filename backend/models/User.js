// backend/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Caminho para o seu arquivo de conexão database.js
const bcrypt = require('bcryptjs'); // Para hash de senhas

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID, // Tipo UUID para IDs únicos globais
        defaultValue: DataTypes.UUIDV4, // Gera UUIDs automaticamente
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true, // Garante que o email seja único
        allowNull: false, // Não permite valores nulos
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: { // Define o papel do usuário: 'manager' (gerente) ou 'cleaner' (diarista)
        type: DataTypes.ENUM('manager', 'cleaner'),
        allowNull: false,
        defaultValue: 'cleaner' // Define um valor padrão, pode ser alterado no cadastro
    }
}, {
    timestamps: true // Adiciona automaticamente as colunas 'createdAt' e 'updatedAt'
});

// Hook (gancho) do Sequelize para fazer o hash da senha antes de salvar um novo usuário
// Isso é crucial para a segurança!
User.beforeCreate(async (user) => {
    if (user.password) { // Apenas faz o hash se a senha existir
        user.password = await bcrypt.hash(user.password, 10); // '10' é o saltRounds, complexidade do hash
    }
});

module.exports = User;