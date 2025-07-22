// backend/controllers/taskController.js

const User = require('../models/User');
const Unit = require('../models/Unit');
const Task = require('../models/Task');

// --- CRIAR TAREFA (Concluído) ---
const createTask = async (req, res) => {
    const { unitId, cleanerId, type, checklist } = req.body;
    if (!unitId || !cleanerId || !type) {
        return res.status(400).json({ message: 'Os campos unitId, cleanerId e type são obrigatórios.' });
    }
    try {
        const unitExists = await Unit.findByPk(unitId);
        const cleanerExists = await User.findOne({ where: { id: cleanerId, role: 'cleaner' } });

        if (!unitExists) return res.status(404).json({ message: 'Unidade não encontrada.' });
        if (!cleanerExists) return res.status(404).json({ message: 'Usuário cleaner não encontrado.' });

        const newTask = await Task.create({ unitId, cleanerId, type, checklist });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

// --- LER TAREFAS (Concluído) ---
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [
                { model: Unit, as: 'unit', attributes: ['id', 'name'] },
                { model: User, as: 'cleaner', attributes: ['id', 'fullName'] }
            ]
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id, {
            include: [
                { model: Unit, as: 'unit', attributes: ['id', 'name'] },
                { model: User, as: 'cleaner', attributes: ['id', 'fullName'] }
            ]
        });
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao buscar tarefa por ID:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

// --- ATUALIZAR TAREFA (Novo) ---
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        // 'update' retorna o número de linhas afetadas
        await task.update(req.body);
        
        // Retornamos a tarefa atualizada
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

// --- DELETAR TAREFA (Versão Corrigida e Mais Robusta) ---
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID da URL

        // Em vez de buscar e depois deletar, vamos deletar diretamente
        // O método destroy pode receber um objeto 'where' para especificar o que deletar
        const deletedRowCount = await Task.destroy({
            where: {
                id: id
            }
        });

        // O 'destroy' retorna o número de linhas deletadas.
        // Se for 0, significa que nenhuma tarefa com aquele ID foi encontrada.
        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        // Se chegou aqui, a linha foi deletada com sucesso.
        res.status(204).send();

    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }

};


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};