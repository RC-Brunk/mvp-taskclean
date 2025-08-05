// backend/routes/checklistTemplateRoutes.js
const express = require('express');
const router = express.Router();
const checklistTemplateController = require('../controllers/checklistTemplateController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

const jsonParser = express.json();

// --- Todas as rotas abaixo são protegidas e restritas a managers ---

router.post(
    '/',
    authMiddleware,
    checkRole(['manager']),
    jsonParser,
    checklistTemplateController.createTemplate
);

router.get(
    '/',
    authMiddleware,
    checkRole(['manager']),
    checklistTemplateController.getAllTemplates
);

router.get(
    '/:id',
    authMiddleware,
    checkRole(['manager']),
    checklistTemplateController.getTemplateById
);

router.put(
    '/:id',
    authMiddleware,
    checkRole(['manager']),
    jsonParser,
    checklistTemplateController.updateTemplate
);

router.delete(
    '/:id',
    authMiddleware,
    checkRole(['manager']),
    checklistTemplateController.deleteTemplate
);

module.exports = router;