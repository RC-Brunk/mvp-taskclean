# Atlantico-Camareiras: Sistema de Gestão de Limpeza

![Status do Projeto](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/license-MIT-blue)

Este é um projeto fullstack **em desenvolvimento** que visa criar um sistema para gerenciar e verificar tarefas de limpeza em hotéis, pousadas e Airbnbs, com foco na comprovação fotográfica para garantir a qualidade do serviço.

---

## 📖 Tabela de Conteúdos

* [Sobre o Projeto](#sobre-o-projeto)
* [Status do Projeto (Roadmap)](#-backend---api)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Como Começar](#como-começar)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação e Configuração](#instalação-e-configuração)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Contato](#contato)
* [Licença](#licença)

---

## 🎯 Sobre o Projeto

O **Atlantico-Camareiras** foi concebido para resolver um problema comum na gestão de aluguéis de temporada e hotelaria: a falta de um sistema simples e eficaz para atribuir, gerenciar e, principalmente, verificar a conclusão de tarefas de limpeza.

A solução consiste em duas interfaces principais:
1.  Um **Painel Web** para gerentes, onde é possível cadastrar unidades (quartos), faxineiras, criar e delegar tarefas com checklists.
2.  Um **Aplicativo Mobile** para as faxineiras, onde elas visualizam suas tarefas diárias, seguem os checklists e enviam uma foto como prova irrefutável de que o serviço foi concluído nos padrões exigidos.

Este repositório contém o código-fonte completo do projeto, desde a API backend até os aplicativos frontend (Web e Mobile).

---

### 🚀 Backend - API

Esta seção detalha o progresso atual e os próximos passos para o desenvolvimento da nossa API RESTful, que servirá como nosso mapa.

---

#### ✅ **Fase 1: Fundação e Refatoração (Concluído)**

- **[x] Configuração do Servidor:** Inicialização do servidor Express com middlewares essenciais (`cors`, `express.json`).
- **[x] Gestão de Schema com Migrations:**
    - [x] Implementação do `sequelize-cli` para um controle de versão profissional do banco de dados.
    - [x] Criação das migrações iniciais para as tabelas `Users` e `Units`.
- **[x] Autenticação e Autorização:**
    - [x] Sistema completo de Autenticação (`register`/`login` com JWT e bcryptjs).
    - [x] Middlewares de Autorização (`authMiddleware`, `checkRoleMiddleware`) para proteger rotas por login e por papel.
- **[x] Refatoração do Modelo `User`:**
    - [x] Alteração do campo `email` para `username`.
    - [x] Adição do campo `fullName`.
    - [x] Atualização da migração e dos controllers de autenticação.
- **[x] Atualização do Modelo `Unit`:**
    - [x] Adição do status `blocked` ao campo de status da unidade.
    - [x] Atualização da migração da tabela `Units`.

---

#### ⏳ **Fase 2: Módulos Principais (Em Andamento)**

- **[x] Módulo de Unidades (Concluído):**
    - [x] Implementação do CRUD completo (Create, Read, Update, Delete) para gerenciar as unidades.
- **[x] Módulo de Tarefas (CRUD Básico Concluído):**
    - [x] Criado o modelo `Task` e definidas suas **associações** com `User` e `Unit`.
    - [x] Criada a migração para a nova tabela `Tasks`.
    - [x] Implementado o CRUD completo para Tarefas (`createTask`, `getAllTasks`, `getTaskById`, `updateTask`, `deleteTask`).
    - [x] Implementar a lógica para que um `cleaner` possa registrar o início (`startedAt`) e fim (`completedAt`) de uma tarefa.
- **[ ] Módulo de Faxineiras (CRUD Básico Concluído):**
    - [x] Rota `GET /api/cleaners` para listar todos os usuários com o papel `cleaner`.
    - [ ] **A Fazer:** Implementar rotas para buscar uma faxineira por ID, atualizar e deletar.
- **[ ] Módulo de Checklists (A Fazer):**
    - [ ] **A Fazer:** Criar um modelo e CRUD para "Templates de Checklist".
    - [ ] **A Fazer:** Permitir que o `manager` anexe um template de checklist ao criar uma `Tarefa`.
- **[x] Módulo de Manutenção (MVP):**
    - [x] **A Fazer:** Implementar a lógica no `Task` para que um `cleaner` possa marcar a necessidade de manutenção e adicionar notas.

---

#### 📝 **Fase 3: Funcionalidades Avançadas (Futuro)**

- **[ ] Upload de Fotos e Vídeos:**
    - [ ] **A Fazer:** Implementar a lógica com `multer` para receber o upload da foto de comprovação.
    - [ ] **A Fazer:** Integrar com o `aws-sdk` para salvar a imagem no nosso bucket S3.
- **[ ] Notificações:**
    - [ ] **A Fazer:** Pesquisar e implementar um sistema de notificações para avisar os `cleaners` sobre novas tarefas.
- **[ ] Testes Automatizados:**
    - [ ] **A Fazer:** Configurar um ambiente de testes

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack moderna e robusta baseada em JavaScript.

* **Backend (API)**
    * [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
    * [Express.js](https://expressjs.com/) - Framework para a construção da API RESTful.
    * [Sequelize](https://sequelize.org/) - ORM (Object-Relational Mapper) para abstração do banco de dados.
    * [JWT (JSON Web Token)](https://jwt.io/) - Para autenticação e autorização baseada em tokens.
    * [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Para hashing seguro de senhas (versão em JS puro).
    * [Cors](https://github.com/expressjs/cors) - Middleware para habilitar o Cross-Origin Resource Sharing.
    * [Multer](https://github.com/expressjs/multer) - Middleware para upload de arquivos (fotos).

* **Banco de Dados**
    * [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional, robusto e de código aberto.

* **Frontend Web (Painel do Gerente)**
    * [React](https://reactjs.org/) - Biblioteca para a construção da interface de usuário.

* **Aplicativo Mobile (App da Faxineira)**
    * [React Native](https://reactnative.dev/) - Framework para desenvolvimento de aplicativos móveis nativos.
    * [Expo](https://expo.dev/) - Plataforma e ferramentas para agilizar o desenvolvimento com React Native.

* **Infraestrutura e DevOps**
    * [Docker](https://www.docker.com/) - Para containerização da aplicação e do banco de dados.
    * [Docker Compose](https://docs.docker.com/compose/) - Para orquestrar os múltiplos contêineres da aplicação.
    * [AWS S3](https://aws.amazon.com/s3/) - Para armazenamento em nuvem das fotos de comprovação.

---

## 🏁 Como Começar

Siga os passos abaixo para ter uma cópia do projeto rodando localmente na sua máquina.

### Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/mvp-taskclean.git](https://github.com/SEU-USUARIO/mvp-taskclean.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd mvp-taskclean
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie uma cópia do arquivo de exemplo `.env.example` e renomeie para `.env`.
        ```bash
        # No Windows (PowerShell)
        copy .env.example .env

        # No Linux/macOS
        cp .env.example .env
        ```
    * Abra o arquivo `.env` e preencha as variáveis com suas credenciais.
        ```env
        # Configurações do Banco de Dados PostgreSQL
        DB_USER=seu_usuario_do_banco
        DB_PASSWORD=sua_senha_do_banco
        DB_NAME=taskclean_db
        DB_HOST=db # Mantenha 'db', pois é o nome do serviço no Docker Compose

        # Chave Secreta para JWT
        JWT_SECRET=sua_chave_secreta_super_segura

        # Credenciais da AWS para o S3
        AWS_ACCESS_KEY_ID=sua_chave_de_acesso_aws
        AWS_SECRET_ACCESS_KEY=sua_chave_secreta_aws
        S3_BUCKET_NAME=nome_do_seu_bucket_s3
        AWS_REGION=regiao_do_seu_bucket # ex: us-east-1
        ```

4.  **Suba os Contêineres Docker:**
    * Este comando irá construir as imagens e iniciar os serviços do backend e do banco de dados em segundo plano.
    ```bash
    docker compose up -d --build
    ```

5.  **Verifique se tudo está funcionando:**
    * Após alguns instantes, verifique os logs do contêiner do backend para confirmar a conexão com o banco.
    ```bash
    docker compose logs backend
    ```
    * Você deverá ver as mensagens: `Conexão com o banco de dados estabelecida com sucesso.` e `Servidor rodando na porta 3001.`

Pronto! O ambiente backend está no ar e pronto para receber requisições na porta `3001`.

---

## 📂 Estrutura do Projeto

A estrutura de pastas foi organizada de forma modular para separar as responsabilidades de cada parte do sistema.

```
mvp-taskclean/
├── .env                  # Variáveis de ambiente (local, ignorado pelo Git)
├── .gitignore            # Arquivos ignorados pelo Git
├── docker-compose.yml    # Orquestração dos serviços Docker
├── README.md             # Este arquivo
├── backend/              # Módulo do servidor (API Node.js)
│   ├── Dockerfile        # Receita da imagem Docker do backend
│   ├── package.json      # Dependências e scripts do backend
│   ├── server.js         # Ponto de entrada da aplicação
│   ├── config/           # Arquivos de configuração (DB, etc.)
│   ├── models/           # Modelos de dados do Sequelize
│   ├── routes/           # Definição das rotas da API
│   └── ...
├── frontend-web/         # Módulo do painel web (React)
└── mobile-app/           # Módulo do aplicativo mobile (React Native)
```
---

## 👤 Contato

**Bruno Ferreira**

* GitHub: [RC-BrunK](https://github.com/RC-Brunk)
* LinkedIn: [Bruno Ferreira](https://linkedin.com/in/bruno-ferreira-13067015b)

---

## 📜 Licença

Distribuído sob a Licença MIT.