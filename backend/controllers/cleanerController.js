// backend/controllers/cleanerController.js
const User = require('../models/User');

// --- LER TODAS AS FAXINEIRAS ---
const getAllCleaners = async (req, res) => {
    try {
        // Busca todos os usuários onde a coluna 'role' é igual a 'cleaner'
        const cleaners = await User.findAll({
            where: {
                role: 'cleaner'
            },
            // Importante: Exclui o campo de senha da resposta por segurança
            attributes: {
                exclude: ['password']
            }
        });

        res.status(200).json(cleaners);
    } catch (error) {
        console.error('Erro ao buscar faxineiras:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

module.exports = {
    getAllCleaners,
};