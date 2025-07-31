const Task = require('../../models/Task');

const startTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { id: cleanerId } = req.user;
        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
        if (task.cleanerId !== cleanerId) return res.status(403).json({ message: 'Acesso negado. Esta tarefa não foi atribuída a você.' });
        if (task.status !== 'pending') return res.status(409).json({ message: `Esta tarefa não pode ser iniciada pois seu status é '${task.status}'.`});
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
        const { maintenance_required, maintenance_notes } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada.' });
        if (task.cleanerId !== cleanerId) return res.status(403).json({ message: 'Acesso negado. Esta tarefa não foi atribuída a você.' });
        if (task.status !== 'in_progress') return res.status(409).json({ message: `Esta tarefa não pode ser finalizada pois seu status é '${task.status}'.`});
        task.status = 'pending_approval';
        task.completedAt = new Date();
        if (maintenance_required !== undefined) task.maintenance_required = maintenance_required;
        if (maintenance_notes) task.maintenance_notes = maintenance_notes;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error("Erro ao finalizar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

module.exports = {
    startTask,
    finishTask,
}