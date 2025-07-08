// backend/server.js

require('dotenv').config(); // Carrega variáveis de ambiente do .env

const express = require('express');
const cors = require('cors'); // Middleware para permitir requisições de diferentes origens
const sequelize = require('./config/database'); // Importa a configuração do banco de dados

// Importa os modelos (necessário para o Sequelize reconhecê-los para as Migrações ou outras operações)
const User = require('./models/User'); 
const Unit = require('./models/Unit'); // Seu modelo Unit já importado

// Importa as rotas (que você já adiantou a criação)
const authRoutes = require('./routes/authRoutes');
const unitRoutes = require('./routes/unitRoutes');

const app = express();
const PORT = process.env.PORT || 3001; // Define a porta do servidor UMA ÚNICA VEZ

// Middlewares básicos
app.use(cors()); // Habilita CORS para que o frontend possa se comunicar
app.use(express.json()); // Habilita o Express a ler JSON no corpo das requisições

// Rota de teste para verificar se a API está no ar
app.get('/api/health-check', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API do TaskClean está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Usar as rotas de autenticação com o prefixo /api/auth
app.use('/api/auth', authRoutes);

// Usar as rotas de unidades com o prefixo /api/units
app.use('/api/units', unitRoutes);

// Rota de teste simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Backend do MVP-TaskClean Online e Rodando!');
});

// Conecta ao banco de dados e INICIA O SERVIDOR
sequelize.authenticate() // Tenta autenticar a conexão com o banco de dados
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        // A sincronização do esquema do banco de dados será feita AGORA pelas Migrações.
        
        // Inicia o servidor Express somente após a conexão bem-sucedida com o DB
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Sai do processo se houver erro crítico na conexão
    });