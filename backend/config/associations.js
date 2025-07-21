// backend/config/associations.js

const User = require('../models/User');
const Unit = require('../models/Unit');
const Task = require('../models/Task');

console.log('Definindo associações...');

// Relação: Uma Unidade (Unit) tem muitas Tarefas (Task)
// Uma Tarefa (Task) pertence a uma Unidade (Unit)
Unit.hasMany(Task, {
    foreignKey: {
        name: 'unitId',
        allowNull: false
    },
    as: 'tasks'
});
Task.belongsTo(Unit, {
    foreignKey: 'unitId',
    as: 'unit'
});


// Relação: Um Usuário (User) pode ter muitas Tarefas (Task)
// Uma Tarefa (Task) pertence a um Usuário (User)
// Usamos o alias 'cleaner' para especificar que este é o usuário faxineira
User.hasMany(Task, {
    foreignKey: {
        name: 'cleanerId',
        allowNull: false // Uma tarefa sempre precisa de um responsável
    },
    as: 'tasks'
});
Task.belongsTo(User, {
    foreignKey: 'cleanerId',
    as: 'cleaner'
});


console.log('Associações definidas com sucesso.');