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

// --- AÇÕES DO CLEANER ---
const startTask = async (req, res) => {
    try {
        const { id: taskId } = req.params; // ID da tarefa vindo da URL
        const { id: cleanerId } = req.user; // ID do usuário logado vindo do token (middleware)

        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        // Verificação de segurança: a faxineira logada é a mesma para quem a tarefa foi atribuída?
        if (task.cleanerId !== cleanerId) {
            return res.status(403).json({ message: 'Acesso negado. Esta tarefa não foi atribuída a você.' });
        }

        // Verifica se a tarefa já não foi iniciada ou concluída
        if (task.status !== 'pending') {
            return res.status(409).json({ message: `Esta tarefa não pode ser iniciada pois seu status é '${task.status}'.`});
        }

        // Atualiza o status e o timestamp de início
        task.status = 'in_progress';
        task.startedAt = new Date();
        await task.save();

        res.status(200).json(task);

    } catch (error) {
        console.error("Erro ao iniciar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

const finishTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { id: cleanerId } = req.user;
        // Pega os dados de manutenção do corpo da requisição (se existirem)
        const { maintenance_required, maintenance_notes } = req.body;

        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }

        if (task.cleanerId !== cleanerId) {
            return res.status(403).json({ message: 'Acesso negado. Esta tarefa não foi atribuída a você.' });
        }

        if (task.status !== 'in_progress') {
            return res.status(409).json({ message: `Esta tarefa não pode ser finalizada pois seu status é '${task.status}'.`});
        }

        // Atualiza os campos principais
        task.status = 'pending_approval';
        task.completedAt = new Date();

        // Atualiza os campos de manutenção se eles foram enviados na requisição
        if (maintenance_required !== undefined) {
            task.maintenance_required = maintenance_required;
        }
        if (maintenance_notes) {
            task.maintenance_notes = maintenance_notes;
        }

        await task.save();

        res.status(200).json(task);

    } catch (error) {
        console.error("Erro ao finalizar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    startTask,   
    finishTask,  
};