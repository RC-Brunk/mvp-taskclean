// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
router.use(express.json());
// Importa o nosso controller!
const authController = require('../controllers/authController');

// Agora a rota de registro simplesmente chama a função 'register' do controller
router.post('/register', authController.register);

// E a rota de login chama a função 'login' do controller
router.post('/login', authController.login);

module.exports = router;
