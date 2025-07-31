const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    // Passo 1: Extrair dados do corpo da requisição
    const { fullName, username, password, role } = req.body;

    // Passo 2: Validação dos dados de entrada
    if (!fullName || !username || !password) {
        return res.status(400).json({ message: 'Nome completo, nome de usuário e senha são obrigatórios.' });
    }

    try {
        // Passo 3: Verificar se o nome de usuário já existe
        const existingUser = await User.findOne({ where: { username: username } });

        if (existingUser) {
            return res.status(409).json({ message: 'Este nome de usuário já está em uso.' });
        }

        // Passo 4: Criar o novo usuário no banco
        
        const newUser = await User.create({
            fullName,
            username,
            password,
            role: role || 'cleaner'
        });

        // Passo 5: Enviar uma resposta de sucesso
        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            userId: newUser.id
        });

    } catch (error) {
        console.error('Erro no registro do usuário:', error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

// -- LOGIN (Atualizado para usar username) --
const login = async (req, res) => {
    // Passo 1: Extrair username e senha
    const { username, password } = req.body;

    // Passo 2: Validar a entrada
    if (!username || !password) {
        return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
        // Passo 3: Encontrar o usuário no banco pelo username
        const user = await User.findOne({ where: { username: username } });

        // Passo 4: Verificar se o usuário existe E se a senha corresponde
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Passo 5: Gerar o Token JWT
        const payload = {
            id: user.id,
            role: user.role,
            fullName: user.fullName // Adicionando o nome completo ao token
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
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


module.exports = {
    register,
    login,
};