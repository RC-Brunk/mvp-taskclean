// backend/server.js

require('dotenv').config(); // Carrega variáveis de ambiente do .env

const express = require('express');
const cors = require('cors'); // Middleware para permitir requisições de diferentes origens
const sequelize = require('./config/database'); // Importa a configuração do banco de dados (que vamos criar)
const User = require('./models/User'); // Importa o modelo User (que vamos criar)

const app = express();
const PORT = process.env.PORT || 3001; // Porta do servidor, definida no .env ou 3001 como padrão

// Middlewares básicos
app.use(cors()); // Habilita CORS para que o frontend possa se comunicar
app.use(express.json()); // Habilita o Express a ler JSON no corpo das requisições

// Rota de teste simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Backend do MVP-TaskClean Online e Rodando!');
});

// TODO: Adicionar rotas e lógica da API aqui mais tarde

// Conecta ao banco de dados e sincroniza os modelos
sequelize.authenticate() // Tenta autenticar a conexão com o banco de dados
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        // Sincroniza todos os modelos definidos com o banco de dados.
        // 'force: false' significa que ele não vai apagar tabelas existentes.
        // Para recriar tabelas em desenvolvimento, use 'force: true' (mas com cuidado!).
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
        // Inicia o servidor Express somente após a conexão e sincronização com o DB
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar ou sincronizar com o banco de dados:', err);
        process.exit(1); // Sai do processo se houver erro crítico
    });