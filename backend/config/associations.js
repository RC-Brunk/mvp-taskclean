const User = require('../models/User');
const Unit = require('../models/Unit');
const Task = require('../models/Task');
const ChecklistTemplate = require('../models/ChecklistTemplate'); // <-- ADICIONE ESTA LINHA

console.log('Definindo associações...');

// --- Associações de Task com Unit e User (Já existentes) ---
Unit.hasMany(Task, {
    foreignKey: { name: 'unitId', allowNull: false },
    as: 'tasks'
});
Task.belongsTo(Unit, {
    foreignKey: 'unitId',
    as: 'unit'
});

User.hasMany(Task, {
    foreignKey: { name: 'cleanerId', allowNull: false },
    as: 'tasks'
});
Task.belongsTo(User, {
    foreignKey: 'cleanerId',
    as: 'cleaner'
});
// Relação: Um Template pode ser usado em muitas Tarefas.
// Uma Tarefa pode ter (ou pertencer a) um Template.
ChecklistTemplate.hasMany(Task, {
    foreignKey: {
        name: 'checklistTemplateId',
        allowNull: true // Permitimos que uma tarefa seja criada sem um template
    }
});
Task.belongsTo(ChecklistTemplate, {
    foreignKey: 'checklistTemplateId',
    as: 'checklistTemplate'
});


console.log('Associações definidas com sucesso.');