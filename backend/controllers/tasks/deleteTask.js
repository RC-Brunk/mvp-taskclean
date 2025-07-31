const Task = require('../../models/Task');

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Task.destroy({ where: { id: id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Tarefa não encontrada.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

module.exports = deleteTask;