// backend/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    // Definição das colunas
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('manager', 'cleaner'),
        allowNull: false,
        defaultValue: 'cleaner'
    }
}, {
    // Objeto de opções do Sequelize
    timestamps: true, // Habilita as colunas createdAt e updatedAt
    hooks: {
        // Hook (gancho) para fazer o hash da senha antes de criar um novo usuário
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10); // '10' é o saltRounds
            }
        }
    }
});

module.exports = User;