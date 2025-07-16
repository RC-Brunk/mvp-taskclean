// backend/middlewares/checkRoleMiddleware.js

// Este middleware recebe uma lista de papéis (roles) permitidos
const checkRole = (roles) => {
    return (req, res, next) => {
        // Pega o usuário do 'req', que foi adicionado pelo 'authMiddleware'
        const user = req.user;

        // Verifica se o usuário existe e se o seu papel está na lista de papéis permitidos
        if (!user || !roles.includes(user.role)) {
            // Se não tiver permissão, retorna um erro 403 Forbidden
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para este recurso.' });
        }

        // Se tiver permissão, permite que a requisição continue
        next();
    };
};

module.exports = checkRole;