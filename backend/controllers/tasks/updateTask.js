const Task = require('../../models/Task');

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        await task.update(req.body);
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

module.exports = updateTask;