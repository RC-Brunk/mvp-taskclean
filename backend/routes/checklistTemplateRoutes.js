const express = require('express');
const router = express.Router();
router.use(express.json());
const checklistTemplateController = require('../controllers/checklistTemplateController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');

// Protege todas as rotas de templates
router.use(authMiddleware);
router.use(checkRole(['manager'])); // Apenas managers podem gerenciar templates

// Rotas do CRUD para ChecklistTemplates
router.post('/', checklistTemplateController.createTemplate);
router.get('/', checklistTemplateController.getAllTemplates);
router.get('/:id', checklistTemplateController.getTemplateById);
router.put('/:id', checklistTemplateController.updateTemplate);
router.delete('/:id', checklistTemplateController.deleteTemplate);

module.exports = router;