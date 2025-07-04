// backend/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Função para registrar um novo usuário
// Função para registrar um novo usuário - VERSÃO FINAL
const register = async (req, res) => {
    // Passo 1: Extrair 'email' e 'password' do corpo da requisição
    const { email, password, role } = req.body;

    // Passo 2: Validar se os dados essenciais foram enviados
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Passo 3: Verificar se um usuário com este email já existe no banco
        const existingUser = await User.findOne({ where: { email: email } });

        if (existingUser) {
            // Se o usuário já existe, retorna um erro do tipo "Conflito"
            return res.status(409).json({ message: 'Este email já está em uso.' });
        }

        // Passo 4: Se o email é novo, criar o usuário no banco de dados.
        // Lembre-se: o 'hook' `beforeCreate` no modelo User.js irá automaticamente
        // fazer o hash da senha antes de salvá-la. Não precisamos fazer isso aqui.
        const newUser = await User.create({
            email,
            password,
            role: role || 'cleaner' // Se uma 'role' não for enviada, o padrão será 'cleaner'
        });

        // Passo 5: Enviar uma resposta de sucesso.
        // É uma boa prática não enviar o objeto do usuário inteiro de volta (especialmente a senha hasheada).
        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            userId: newUser.id // Enviar o ID do novo usuário é uma boa confirmação.
        });

    } catch (error) {
        // Passo 6: Se algo inesperado acontecer (ex: falha de conexão com o DB),
        // capturar o erro e enviar uma resposta de erro genérica.
        console.error('Erro no registro do usuário:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.' });
    }
};

// Função para fazer login de um usuário
// Função para fazer login de um usuário - VERSÃO FINAL
const login = async (req, res) => {
    // Passo 1: Extrair email e senha
    const { email, password } = req.body;

    // Passo 2: Validar a entrada
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Passo 3: Encontrar o usuário no banco pelo email
        const user = await User.findOne({ where: { email: email } });

        // Passo 4: Verificar se o usuário existe E se a senha corresponde
        // Usamos bcrypt.compare para comparar a senha enviada com a senha hasheada no banco
        if (!user || !(await bcrypt.compare(password, user.password))) {
            // Se o usuário não existe OU a senha não bate, enviamos um erro genérico.
            // É uma boa prática de segurança não dizer se foi o email ou a senha que errou.
            return res.status(401).json({ message: 'Credenciais inválidas.' }); // 401 Unauthorized
        }

        // Passo 5: Se tudo estiver correto, gerar o Token JWT
        const payload = {
            id: user.id,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, // Nossa chave secreta do arquivo .env
            { expiresIn: '24h' }    // Define um tempo de expiração para o token
        );

        // Passo 6: Enviar a resposta de sucesso com o token
        res.status(200).json({
            message: 'Login bem-sucedido!',
            token: token
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// Exporta as funções para que as rotas possam usá-las
module.exports = {
    register,
    login,
};