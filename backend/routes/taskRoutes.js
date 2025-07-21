// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const checkRole = require('../middlewares/checkRoleMiddleware.js');

// Todas as rotas de tarefas exigem que o usuário esteja logado
router.use(authMiddleware);

// Rota para criar uma nova tarefa (restringida a usuários 'manager')
router.post('/', checkRole(['manager']), taskController.createTask);

// TODO: Adicionar outras rotas de tarefas (GET, PUT, DELETE) aqui no futuro.

module.exports = router;