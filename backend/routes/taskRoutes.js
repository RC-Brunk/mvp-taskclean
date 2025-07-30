// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const upload = require('../config/multer');

const jsonParser = express.json();

// --- Rotas de Gerente (manager) ---
router.post(
    '/',
    authMiddleware,
    checkRole(['manager']),
    jsonParser,
    taskController.createTask
);

router.put(
    '/:id',
    authMiddleware,
    checkRole(['manager']),
    jsonParser,
    taskController.updateTask
);

router.delete(
    '/:id',
    authMiddleware,
    checkRole(['manager']),
    taskController.deleteTask
);

// --- Rotas de Faxineira (cleaner) ---
router.patch(
    '/:id/start',
    authMiddleware,
    checkRole(['cleaner']),
    taskController.startTask
);

router.patch(
    '/:id/finish',
    authMiddleware,
    checkRole(['cleaner']),
    jsonParser,
    taskController.finishTask
);

router.post(
    '/:id/upload-proof',
    authMiddleware,
    checkRole(['cleaner']),
    upload.single('proofImage'),
    taskController.uploadProofImage
);

// --- Rotas Abertas para todos os usuários logados ---
router.get(
    '/',
    authMiddleware,
    taskController.getAllTasks
);

router.get(
    '/:id',
    authMiddleware,
    taskController.getTaskById
);

module.exports = router;