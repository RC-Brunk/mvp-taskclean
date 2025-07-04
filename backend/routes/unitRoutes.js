// backend/routes/unitRoutes.js
const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicamos o middleware de autenticação a todas as rotas de unidades.
// Apenas usuários logados poderão acessar estas rotas.
router.use(authMiddleware);

// Rotas do CRUD
router.post('/', unitController.createUnit);       // Criar uma nova unidade
router.get('/', unitController.getAllUnits);      // Obter todas as unidades
router.get('/:id', unitController.getUnitById);   // Obter uma unidade pelo ID
router.put('/:id', unitController.updateUnit);      // Atualizar uma unidade
router.delete('/:id', unitController.deleteUnit); // Deletar uma unidade

module.exports = router;