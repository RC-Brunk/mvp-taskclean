// backend/server.js

require('dotenv').config(); // Carrega variáveis de ambiente do .env

const authRoutes = require('./routes/authRoutes');
const express = require('express');
const cors = require('cors'); // Middleware para permitir requisições de diferentes origens
const sequelize = require('./config/database'); // Importa a configuração do banco de dados (que vamos criar)
const User = require('./models/User'); // Importa o modelo User (que vamos criar)
const Unit = require('./models/Unit');
const unitRoutes = require('./routes/unitRoutes');

const app = express();
const PORT = process.env.PORT || 3001; // Porta do servidor, definida no .env ou 3001 como padrão

// Rota de teste para verificar se a API está no ar
app.get('/api/health-check', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API do TaskClean está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Middlewares básicos
app.use(cors()); // Habilita CORS para que o frontend possa se comunicar
app.use(express.json()); // Habilita o Express a ler JSON no corpo das requisições

// Usar as rotas de autenticação com o prefixo /api/auth
app.use('/api/auth', authRoutes);

// Usar as rotas de unidades com o prefixo /api/units
app.use('/api/units', unitRoutes);

// Rota de teste simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Backend do MVP-TaskClean Online e Rodando!');
});

// TODO: Adicionar rotas e lógica da API aqui mais tarde

// Conecta ao banco de dados e sincroniza os modelos
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        // Sincroniza os modelos com o banco, alterando tabelas existentes se necessário
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
        // Inicia o servidor Express somente após a conexão e sincronização com o DB
        const PORT = process.env.PORT || 3001; // Adicionei a definição do PORT aqui
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ou sincronizar com o banco de dados:', err);
        process.exit(1);
    });