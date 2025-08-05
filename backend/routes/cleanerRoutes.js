// backend/routes/cleanerRoutes.js
const express = require('express');
const router = express.Router();
const cleanerController = require('../controllers/cleanerController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

// Rota para obter todas as faxineiras (protegida por login e papel de manager)
router.get(
    '/',
    authMiddleware,
    checkRole(['manager']),
    cleanerController.getAllCleaners
);

// TODO: Adicionar rotas para GET by ID, UPDATE, e DELETE no futuro.

module.exports = router;