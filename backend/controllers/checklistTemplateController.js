const ChecklistTemplate = require('../models/ChecklistTemplate');

// --- CRIAR UM NOVO TEMPLATE ---
const createTemplate = async (req, res) => {
    const { name, items } = req.body;

    if (!name || !items) {
        return res.status(400).json({ message: 'O nome e os itens do template são obrigatórios.' });
    }

    try {
        const newTemplate = await ChecklistTemplate.create({ name, items });
        res.status(201).json(newTemplate);
    } catch (error) {
        // Trata o erro de nome único
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Já existe um template com este nome.' });
        }
        console.error('Erro ao criar template:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- LER TODOS OS TEMPLATES ---
const getAllTemplates = async (req, res) => {
    try {
        const templates = await ChecklistTemplate.findAll();
        res.status(200).json(templates);
    } catch (error) {
        console.error('Erro ao buscar templates:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- LER UM TEMPLATE POR ID ---
const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await ChecklistTemplate.findByPk(id);

        if (!template) {
            return res.status(404).json({ message: 'Template não encontrado.' });
        }

        res.status(200).json(template);
    } catch (error) {
        console.error('Erro ao buscar template por ID:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- ATUALIZAR UM TEMPLATE ---
const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const template = await ChecklistTemplate.findByPk(id);

        if (!template) {
            return res.status(404).json({ message: 'Template não encontrado.' });
        }

        await template.update(req.body);
        res.status(200).json(template);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Já existe um template com este nome.' });
        }
        console.error('Erro ao atualizar template:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- DELETAR UM TEMPLATE ---
const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await ChecklistTemplate.destroy({ where: { id: id } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'Template não encontrado.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar template:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

module.exports = {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate,
};