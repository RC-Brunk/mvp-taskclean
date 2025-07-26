// backend/models/Task.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('arrumacao', 'limpeza_completa'),
        allowNull: false,
        comment: 'Define se é uma arrumação simples ou uma limpeza de check-out.'
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'pending_approval'),
        defaultValue: 'pending',
        allowNull: false,
        comment: 'O status atual da tarefa de limpeza.'
    },
    checklist: {
        type: DataTypes.JSONB,
        allowNull: true,
        comment: 'Armazena a estrutura e o estado do checklist para esta tarefa.'
    },
    startedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp de quando a limpeza foi iniciada.'
    },
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp de quando a limpeza foi concluída.'
    },
    maintenance_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    maintenance_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        
        proofImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL da imagem de comprovação armazenada no S3.'
    }
    } 
    // As colunas de chave estrangeira (unitId, cleanerId) serão adicionadas
    // automaticamente pelo Sequelize quando definirmos as associações.
}, {
    timestamps: true, // Adiciona createdAt e updatedAt
});

module.exports = Task;