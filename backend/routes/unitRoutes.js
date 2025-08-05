const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

const jsonParser = express.json(); // Criamos uma instância do parser

// Rota para obter todas as unidades (protegida por login)
router.get('/', authMiddleware, unitController.getAllUnits);

// Rota para obter uma unidade por ID (protegida por login)
router.get('/:id', authMiddleware, unitController.getUnitById);

// Rota para criar uma nova unidade (protegida por login E papel de manager)
router.post(
    '/',
    authMiddleware,
    checkRole(['manager']),
    jsonParser,
    unitController.createUnit
);

// Rota para atualizar uma unidade (protegida por login E papel de manager)
router.put(
    '/:id',
    authMiddleware,
    checkRole(['manager']),
    jsonParser,
    unitController.updateUnit
);

// Rota para deletar uma unidade (protegida por login E papel de manager)
router.delete(
    '/:id',
    authMiddleware,
    checkRole(['manager']),
    unitController.deleteUnit
);

router.get('/:id/active-task', unitController.getActiveTaskForUnit);

module.exports = router;