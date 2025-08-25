# Atlantico-Camareiras: Sistema de Gestão de Limpeza

![Status do Projeto](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/license-MIT-blue)

Este é um projeto fullstack **em desenvolvimento** que visa criar um sistema para gerenciar e verificar tarefas de limpeza em hotéis, pousadas e Airbnbs, com foco na comprovação fotográfica para garantir a qualidade do serviço.

---

![Screenshot do painel de administrador mostrando os cards de status e a grade de apartamentos.](./assests/Dashboard_Camareira.png)

## 📖 Tabela de Conteúdos

- [Sobre o Projeto](#sobre-o-projeto)
- [Status do Projeto (Roadmap)](#-backend---api)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Começar](#como-começar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contato](#contato)
- [Licença](#licença)

---

## 🎯 Sobre o Projeto

O **Atlantico-Camareiras** foi concebido para resolver um problema comum na gestão de aluguéis de temporada e hotelaria: a falta de um sistema simples e eficaz para atribuir, gerenciar e, principalmente, verificar a conclusão de tarefas de limpeza.

A solução consiste em duas interfaces principais:

1.  Um **Painel Web** para gerentes, onde é possível cadastrar unidades (quartos), faxineiras, criar e delegar tarefas com checklists.
2.  Um **Aplicativo Mobile** para as faxineiras, onde elas visualizam suas tarefas diárias, seguem os checklists e enviam uma foto como prova irrefutável de que o serviço foi concluído nos padrões exigidos.

Este repositório contém o código-fonte completo do projeto, desde a API backend até os aplicativos frontend (Web e Mobile).

---=

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
- **[x] Módulo de Faxineiras (CRUD Básico Concluído):**
  - [x] Rota `GET /api/cleaners` para listar todos os usuários com o papel `cleaner`.
  - [x] **A Fazer:** Implementar rotas para buscar uma faxineira por ID, atualizar e deletar.
- **[x] Módulo de Checklists (A Fazer):**
  - [x] **A Fazer:** Criar um modelo e CRUD para "Templates de Checklist".
  - [x] **A Fazer:** Permitir que o `manager` anexe um template de checklist ao criar uma `Tarefa`.
- **[x] Módulo de Manutenção (MVP):**
  - [x] **A Fazer:** Implementar a lógica no `Task` para que um `cleaner` possa marcar a necessidade de manutenção e adicionar notas.

---

#### 📝 **Fase 3: Funcionalidades Avançadas (Futuro)**

- **[x] Upload de Fotos e Vídeos:**
  - [x] **A Fazer:** Implementar a lógica com `multer` para receber o upload da foto de comprovação.
  - [x] **A Fazer:** Integrar com o `aws-sdk` para salvar a imagem no nosso bucket S3.
- **[x] Notificações:**
  - [ ] **A Fazer:** Pesquisar e implementar um sistema de notificações para avisar os `cleaners` sobre novas tarefas.
- **[ ] Testes Automatizados:**
  - [ ] **A Fazer:** Configurar um ambiente de testes

---

---

### 🖥️ Frontend - Painel Web (React)

Esta seção detalha o plano de desenvolvimento para a interface do administrador, que será construída com React e Vite.

---

#### ✅ **Fase 1: Estrutura e Fundação (Concluído)**

- **[x] Inicialização do Projeto:** Projeto React criado com sucesso utilizando Vite na pasta `frontend-web/`.
- **[x] Instalação de Dependências:** `npm install` executado, preparando o ambiente de desenvolvimento.
- **[x] Servidor de Desenvolvimento:** Servidor local (`npm run dev`) validado e funcionando.

---

#### ⏳ **Fase 2: Estrutura, Autenticação e Layout Base (Em Andamento)**

- **[ ] Estruturação de Pastas:**
  - [ ] **A Fazer:** Criar a estrutura de diretórios padrão para o projeto: `src/pages`, `src/components`, `src/services`, `src/hooks`, `src/styles`, etc.
- **[ ] Instalação de Bibliotecas Essenciais:**
  - [ ] **A Fazer:** Instalar e configurar o `react-router-dom` para gerenciamento de rotas (navegação entre páginas).
  - [ ] **A Fazer:** Instalar o `axios` para fazer as requisições HTTP para o nosso backend.
- **[ ] Página de Login:**
  - [ ] **A Fazer:** Criar o componente visual da página de login (`src/pages/Login.jsx`).
  - [ ] **A Fazer:** Implementar a lógica para chamar o endpoint `POST /api/auth/login` da nossa API.
  - [ ] **A Fazer:** Criar um serviço para salvar o token JWT no `localStorage` do navegador após o login.
- **[ ] Roteamento e Rotas Protegidas:**
  - [ ] **A Fazer:** Criar um componente de "Rota Protegida" que verifica se o usuário tem um token válido antes de permitir o acesso a páginas internas.
  - [ ] **A Fazer:** Configurar as rotas principais da aplicação (ex: `/login`, `/dashboard`).
- **[ ] Layout Principal:**
  - [ ] **A Fazer:** Criar um componente de Layout base (com menu lateral e área de conteúdo) que será usado em todas as páginas internas.

---

#### 📝 **Fase 3: Módulos do CRUD (A Fazer)**

- **[ ] Dashboard Principal:**
  - [ ] **A Fazer:** Criar a página de Dashboard que exibirá os status gerais (ex: apartamentos para arrumar, em arrumação, etc.).
- **[ ] CRUD de Unidades:**
  - [ ] **A Fazer:** Criar a tabela para listar todas as unidades (`GET /api/units`).
  - [ ] **A Fazer:** Implementar os modais/formulários para criar, editar e deletar unidades.
- **[ ] CRUD de Faxineiras:**
  - [ ] **A Fazer:** Criar a página para listar todas as faxineiras (`GET /api/cleaners`).
- **[ ] CRUD de Tarefas:**
  - [ ] **A Fazer:** Criar a interface principal para visualizar e gerenciar as tarefas (`GET /api/tasks`).
  - [ ] **A Fazer:** Implementar o formulário de criação de tarefa, que permitirá selecionar uma unidade e uma faxineira.
- **[ ] CRUD de Templates de Checklist:**
  - [ ] **A Fazer:** Criar a interface para que o gerente possa criar e editar os modelos de checklist.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack moderna e robusta baseada em JavaScript.

- **Backend (API)**

  - [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
  - [Express.js](https://expressjs.com/) - Framework para a construção da API RESTful.
  - [Sequelize](https://sequelize.org/) - ORM (Object-Relational Mapper) para abstração do banco de dados.
  - [JWT (JSON Web Token)](https://jwt.io/) - Para autenticação e autorização baseada em tokens.
  - [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Para hashing seguro de senhas (versão em JS puro).
  - [Cors](https://github.com/expressjs/cors) - Middleware para habilitar o Cross-Origin Resource Sharing.
  - [Multer](https://github.com/expressjs/multer) - Middleware para upload de arquivos (fotos).

- **Banco de Dados**

  - [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional, robusto e de código aberto.

- **Frontend Web (Painel do Gerente)**

  - [React](https://reactjs.org/) - Biblioteca para a construção da interface de usuário.

- **Aplicativo Mobile (App da Faxineira)**

  - [React Native](https://reactnative.dev/) - Framework para desenvolvimento de aplicativos móveis nativos.
  - [Expo](https://expo.dev/) - Plataforma e ferramentas para agilizar o desenvolvimento com React Native.

- **Infraestrutura e DevOps**
  - [Docker](https://www.docker.com/) - Para containerização da aplicação e do banco de dados.
  - [Docker Compose](https://docs.docker.com/compose/) - Para orquestrar os múltiplos contêineres da aplicação.
  - [AWS S3](https://aws.amazon.com/s3/) - Para armazenamento em nuvem das fotos de comprovação.

---

## 🏁 Como Começar

Siga os passos abaixo para ter uma cópia do projeto rodando localmente na sua máquina.

### Pré-requisitos

Certifique-se de que você tem as seguintes ferramentas instaladas:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

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

    - Crie uma cópia do arquivo de exemplo `.env.example` e renomeie para `.env`.

      ```bash
      # No Windows (PowerShell)
      copy .env.example .env

      # No Linux/macOS
      cp .env.example .env
      ```

    - Abra o arquivo `.env` e preencha as variáveis com suas credenciais.

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

    - Este comando irá construir as imagens e iniciar os serviços do backend e do banco de dados em segundo plano.

    ```bash
    docker compose up -d --build
    ```

5.  **Verifique se tudo está funcionando:**
    - Após alguns instantes, verifique os logs do contêiner do backend para confirmar a conexão com o banco.
    ```bash
    docker compose logs backend
    ```
    - Você deverá ver as mensagens: `Conexão com o banco de dados estabelecida com sucesso.` e `Servidor rodando na porta 3001.`

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

- GitHub: [RC-BrunK](https://github.com/RC-Brunk)
- LinkedIn: [Bruno Ferreira](https://linkedin.com/in/bruno-ferreira-13067015b)

---

## 📜 Licença

Distribuído sob a Licença MIT.
