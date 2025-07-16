// backend/server.js

// --- 1. Importações dos Módulos ---
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Nossa instância configurada do Sequelize
const cleanerRoutes = require('./routes/cleanerRoutes');

// --- Importação dos Modelos ---
// (É uma boa prática importar os modelos no arquivo principal para que o Sequelize os reconheça, se necessário em outras partes)
require('./models/User');
require('./models/Unit');

// --- Importação das Rotas ---
const authRoutes = require('./routes/authRoutes');
const unitRoutes = require('./routes/unitRoutes');


// --- 2. Configuração do Express ---
const app = express();

// Middlewares essenciais
app.use(cors()); // Habilita CORS para permitir que nosso frontend acesse a API
app.use(express.json()); // Habilita o Express para entender o corpo de requisições em formato JSON


// --- 3. Definição das Rotas da API ---
// Rota "Health Check" para verificar se a API está no ar
app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API do TaskClean está funcionando!' });
});

// Registra as rotas da aplicação
app.use('/api/auth', authRoutes); // Rotas de Autenticação
app.use('/api/units', unitRoutes); // Rotas de Unidades
app.use('/api/cleaners', cleanerRoutes); //Usar as rotas de faxineiras com o prefixo /api/cleaners


// --- 4. Conexão com o Banco de Dados e Inicialização do Servidor ---
const PORT = process.env.PORT || 3001;

console.log('Tentando conectar ao banco de dados...');
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        
        // Inicia o servidor Express APENAS se a conexão com o banco for bem-sucedida
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
        process.exit(1); // Encerra o processo se não conseguir conectar ao DB
    });