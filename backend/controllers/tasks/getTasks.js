const Task = require('../../models/Task');
const User = require('../../models/User');
const Unit = require('../../models/Unit');

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

module.exports = {
    getAllTasks,
    getTaskById,
}