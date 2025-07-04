// backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 1. Buscar o token no header 'Authorization' da requisição
    const authHeader = req.headers.authorization;

    // 2. Verificar se o header existe e se está no formato 'Bearer token'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    // 3. Extrair o token (removendo a palavra 'Bearer ')
    const token = authHeader.split(' ')[1];

    try {
        // 4. Verificar a validade do token com a nossa chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Se o token for válido, o payload decodificado (com id e role do usuário)
        // é adicionado ao objeto da requisição (req) para uso posterior nas rotas.
        req.user = decoded;

        // 6. Chama a próxima função no ciclo da requisição (o controller)
        next();
    } catch (error) {
        // Se o token for inválido (expirado, assinatua errada, etc.), retorna um erro.
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;