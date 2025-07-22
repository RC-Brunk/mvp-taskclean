const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChecklistTemplate = sequelize.define('ChecklistTemplate', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Nome do modelo de checklist, ex: "Limpeza Completa (Check-out)"'
    },
    items: {
        type: DataTypes.JSONB,
        allowNull: false,
        comment: 'A estrutura do checklist, ex: { "etapas": [...] }'
    }
}, {
    timestamps: true
});

module.exports = ChecklistTemplate;