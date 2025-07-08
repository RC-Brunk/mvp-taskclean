// backend/controllers/unitController.js

// 1. Importação do nosso modelo 'Unit' para interagir com o banco de dados.
const Unit = require('../models/Unit');

// --- CRIAR ---
const createUnit = async (req, res) => {
    // Pega o nome e a descrição do corpo da requisição
    const { name, description } = req.body;

    // Validação simples para garantir que o nome foi enviado
    if (!name) {
        return res.status(400).json({ message: 'O nome da unidade é obrigatório.' });
    }

    try {
        // Usa o método create do Sequelize para salvar a nova unidade no banco.
        const newUnit = await Unit.create({
            name,
            description
        });

        // Retorna a unidade recém-criada como confirmação
        res.status(201).json(newUnit);

    } catch (error) {
        console.error('Erro ao criar unidade:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- LER ---
// Função para buscar TODAS as unidades
const getAllUnits = async (req, res) => {
    try {
        const units = await Unit.findAll();
        res.status(200).json(units);
    } catch (error) {
        console.error('Erro ao buscar unidades:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// Função para buscar UMA unidade pelo seu ID
const getUnitById = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID dos parâmetros da URL
        const unit = await Unit.findByPk(id); // findByPk é otimizado para busca por chave primária

        if (!unit) {
            // Se nenhuma unidade for encontrada com esse ID, retorna um erro 404
            return res.status(404).json({ message: 'Unidade não encontrada.' });
        }

        res.status(200).json(unit);
    } catch (error) {
        console.error('Erro ao buscar unidade por ID:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- ATUALIZAR (Update) ---
const updateUnit = async (req, res) => {
    try {
        // Pega o ID da unidade que queremos atualizar a partir dos parâmetros da URL
        const { id } = req.params;
        // Pega os novos dados a serem atualizados do corpo da requisição
        const { name, description, status } = req.body;

        // 1. Encontra a unidade no banco de dados pelo seu ID
        const unit = await Unit.findByPk(id);

        // 2. Se a unidade não for encontrada, retorna um erro 404
        if (!unit) {
            return res.status(404).json({ message: 'Unidade não encontrada.' });
        }

        // 3. Atualiza os campos da unidade com os novos dados
        //    (A lógica '|| unit.name' mantém o valor antigo se um novo não for enviado)
        unit.name = name || unit.name;
        unit.description = description || unit.description;
        unit.status = status || unit.status;

        // 4. Salva as alterações no banco de dados
        await unit.save();

        // 5. Retorna a unidade com os dados atualizados
        res.status(200).json(unit);

    } catch (error) {
        console.error('Erro ao atualizar unidade:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// --- DELETAR (Placeholder) ---
const deleteUnit = (req, res) => {
    res.status(200).json({ message: `Controller: Unidade com ID ${req.params.id} deletada (placeholder)!` });
};


// 2. Exportação de todas as funções para serem usadas nas rotas.
module.exports = {
    createUnit,
    getAllUnits,
    getUnitById,
    updateUnit,
    deleteUnit,
};