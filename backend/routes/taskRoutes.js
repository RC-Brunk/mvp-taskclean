// backend/routes/taskRoutes.js (VERSÃO DE DEPURAÇÃO)
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const upload = require('../config/multer');

const jsonParser = express.json();

// --- Middlewares de Log para Depuração ---
const logStep1 = (req, res, next) => { console.log('[DEBUG] Rota /api/tasks alcançada.'); next(); };
const logStep2 = (req, res, next) => { console.log('[DEBUG] Passou pelo authMiddleware.'); next(); };
const logStep3 = (req, res, next) => { console.log('[DEBUG] Passou pelo checkRole.'); next(); };
const logStep4 = (req, res, next) => { console.log('[DEBUG] Passou pelo jsonParser.'); next(); };

// --- Rotas ---

// Rota para Criar Tarefa com RASTREADORES
router.post(
    '/',
    logStep1,
    authMiddleware,
    logStep2,
    checkRole(['manager']),
    logStep3,
    jsonParser,
    logStep4,
    taskController.createTask
);

// --- Outras Rotas (mantidas como antes para referência) ---
router.put('/:id', jsonParser, authMiddleware, checkRole(['manager']), taskController.updateTask);
router.patch('/:id/finish', jsonParser, authMiddleware, checkRole(['cleaner']), taskController.finishTask);
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.patch('/:id/start', authMiddleware, checkRole(['cleaner']), taskController.startTask);
router.delete('/:id', authMiddleware, checkRole(['manager']), taskController.deleteTask);
router.post('/:id/upload-proof', authMiddleware, checkRole(['cleaner']), upload.single('proofImage'), taskController.uploadProofImage);

module.exports = router;