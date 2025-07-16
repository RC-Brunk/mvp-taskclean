// backend/routes/cleanerRoutes.js
const express = require('express');
const router = express.Router();
const cleanerController = require('../controllers/cleanerController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protege todas as rotas de cleaners
router.use(authMiddleware);

// Importa o novo middleware no topo do arquivo
const checkRole = require('../middlewares/checkRoleMiddleware');

// ... (depois da linha router.use(authMiddleware);)

// Apenas usuários com o papel 'manager' podem acessar esta rota
router.get('/', checkRole(['manager']), cleanerController.getAllCleaners);

module.exports = router;