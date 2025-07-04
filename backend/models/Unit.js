// backend/models/Unit.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Unit = sequelize.define('Unit', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nome da unidade, ex: "Quarto 201" ou "Apartamento 10B"'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Descrição ou notas sobre a unidade.'
    },
    status: {
        type: DataTypes.ENUM('clean', 'dirty', 'in_progress'),
        allowNull: false,
        defaultValue: 'dirty',
        comment: 'Status atual da limpeza da unidade.'
    }
}, {
    timestamps: true
});

module.exports = Unit;