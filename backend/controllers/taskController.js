// backend/controllers/taskController.js

const User = require('../models/User');
const Unit = require('../models/Unit');
const Task = require('../models/Task');

const createTask = async (req, res) => {
    // 1. Extrair os dados necessários do corpo da requisição
    const { unitId, cleanerId, type, checklist } = req.body;

    // 2. Validação dos dados de entrada
    if (!unitId || !cleanerId || !type) {
        return res.status(400).json({ message: 'Os campos unitId, cleanerId e type são obrigatórios.' });
    }

    try {
        // 3. Verificar se a Unidade e o Usuário (cleaner) realmente existem no banco
        const unitExists = await Unit.findByPk(unitId);
        const cleanerExists = await User.findOne({ where: { id: cleanerId, role: 'cleaner' } });

        if (!unitExists) {
            return res.status(404).json({ message: 'Unidade não encontrada.' });
        }
        if (!cleanerExists) {
            return res.status(404).json({ message: 'Usuário cleaner não encontrado ou não tem a permissão necessária.' });
        }

        // 4. Se tudo estiver certo, criar a nova tarefa no banco de dados
        const newTask = await Task.create({
            unitId,
            cleanerId,
            type,
            checklist,
        });

        // 5. Enviar a resposta de sucesso com os dados da tarefa recém-criada
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

module.exports = {
    createTask,
};