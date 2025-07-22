// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

// Protege todas as rotas de tarefas
router.use(authMiddleware);

// Apenas 'managers' podem criar, atualizar ou deletar tarefas
router.post('/', checkRole(['manager']), taskController.createTask);
router.put('/:id', checkRole(['manager']), taskController.updateTask);
router.delete('/:id', checkRole(['manager']), taskController.deleteTask);

// Por enquanto, vamos permitir que qualquer usuário logado possa ver as tarefas
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);

// Rota para uma faxineira iniciar uma tarefa
router.patch('/:id/start', checkRole(['cleaner']), taskController.startTask);

// Rota para uma faxineira finalizar uma tarefa
router.patch('/:id/finish', checkRole(['cleaner']), taskController.finishTask);

module.exports = router;