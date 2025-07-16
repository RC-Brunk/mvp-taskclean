// backend/routes/unitRoutes.js
const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

// Aplicamos o middleware de autenticação a todas as rotas de unidades.
// Apenas usuários logados poderão acessar estas rotas.
router.use(authMiddleware);

router.get('/', unitController.getAllUnits);
router.get('/:id', unitController.getUnitById)

router.post('/', checkRole(['manager']), unitController.createUnit);
router.put('/:id', checkRole(['manager']), unitController.updateUnit);
router.delete('/:id', checkRole(['manager']), unitController.deleteUnit);

module.exports = router;