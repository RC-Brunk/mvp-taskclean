// backend/routes/cleanerRoutes.js
const express = require('express');
const router = express.Router();
const cleanerController = require('../controllers/cleanerController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Protege todas as rotas de cleaners
router.use(authMiddleware);

// Importa o novo middleware no topo do arquivo
const checkRole = require('../middlewares/checkRoleMiddleware.js');

// ... (depois da linha router.use(authMiddleware);)

// Apenas usuários com o papel 'manager' podem acessar esta rota
router.get('/', checkRole(['manager']), cleanerController.getAllCleaners);

module.exports = router;