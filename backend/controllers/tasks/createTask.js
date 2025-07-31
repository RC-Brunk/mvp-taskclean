const User = require('../../models/User');
const Unit = require('../../models/Unit');
const Task = require('../../models/Task');
const ChecklistTemplate = require('../../models/ChecklistTemplate');


const createTask = async (req, res) => {
    const { unitId, cleanerId, type, checklistTemplateId } = req.body;
    if (!unitId || !cleanerId || !type) {
        return res.status(400).json({ message: 'Os campos unitId, cleanerId e type são obrigatórios.' });
    }
    try {
        const unitExists = await Unit.findByPk(unitId);
        const cleanerExists = await User.findOne({ where: { id: cleanerId, role: 'cleaner' } });
        if (!unitExists) return res.status(404).json({ message: 'Unidade não encontrada.' });
        if (!cleanerExists) return res.status(404).json({ message: 'Usuário cleaner não encontrado.' });
        let checklistData = null;
        if (checklistTemplateId) {
            const template = await ChecklistTemplate.findByPk(checklistTemplateId);
            if (!template) return res.status(404).json({ message: 'Modelo de Checklist não encontrado.' });
            checklistData = template.items;
        }
        const newTask = await Task.create({ unitId, cleanerId, type, checklist: checklistData, checklistTemplateId: checklistTemplateId || null });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        res.status(500).json({ message: "Ocorreu um erro no servidor." });
    }
};

module.exports = createTask;
