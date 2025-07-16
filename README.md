# MVP-TaskClean: Sistema de Gestão de Limpeza

![Status do Projeto](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/license-MIT-blue)

Este é um projeto fullstack **em desenvolvimento** que visa criar um sistema para gerenciar e verificar tarefas de limpeza em hotéis, pousadas e Airbnbs, com foco na comprovação fotográfica para garantir a qualidade do serviço.

---

## 📖 Tabela de Conteúdos

* [Sobre o Projeto](#sobre-o-projeto)
* [Status do Projeto e Funcionalidades (MVP)](#-status-do-projeto-e-funcionalidades-mvp)
* [Roadmap Futuro](#️-roadmap-futuro-pós-mvp)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Como Começar](#como-começar)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação e Configuração](#instalação-e-configuração)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Contato](#contato)
* [Licença](#licença)

---

## 🎯 Sobre o Projeto

O **TaskClean** foi concebido para resolver um problema comum na gestão de aluguéis de temporada e hotelaria: a falta de um sistema simples e eficaz para atribuir, gerenciar e, principalmente, verificar a conclusão de tarefas de limpeza.

A solução consiste em duas interfaces principais:
1.  Um **Painel Web** para gerentes, onde é possível cadastrar unidades (quartos), faxineiras, criar e delegar tarefas com checklists.
2.  Um **Aplicativo Mobile** para as faxineiras, onde elas visualizam suas tarefas diárias, seguem os checklists e enviam uma foto como prova irrefutável de que o serviço foi concluído nos padrões exigidos.


---

## 🚦 Status do Projeto e Funcionalidades (MVP)

Este projeto está em **desenvolvimento ativo**. Abaixo está o status atual das principais funcionalidades planejadas para o Produto Mínimo Viável (MVP).

### ✅ Fundamento (Concluído)
- [x] Definição da stack tecnológica (Node.js, React, React Native, PostgreSQL, Docker).
- [x] Estruturação do projeto em monorepo (backend, frontend-web, mobile-app).
- [x] Configuração do ambiente de desenvolvimento com Docker e Docker Compose.
- [x] Validação da conexão entre o backend e o banco de dados.
- [x] Configuração do Git, `.gitignore` e versionamento inicial no GitHub.

### ✅ Backend - API (Progresso Atual)
- [x] **Autenticação:** Implementação completa das rotas de registro (`/register`) e login (`/login`) com JWT e hash de senhas.
- [x] **Middleware de Segurança:** Criação de um middleware para proteger rotas e validar o token JWT.
- [x] **Gerenciamento de Unidades:** CRUD completo para quartos/propriedades.
    - [x] Modelo `Unit` e rotas do CRUD definidos.
    - [x] Middleware de autenticação aplicado com sucesso às rotas.
    - [x] Lógica de **Criação** (`createUnit`) implementada.
    - [x] Lógica de **Leitura** (`getAllUnits`, `getUnitById`) implementada.
    - [x] Lógica de **Atualização** (`updateUnit`) implementada.
    - [x] Lógica de **Deleção** (`deleteUnit`) implementada.
- [x] **Middleware de Segurança:** Criação e aplicação de middlewares para autenticação (JWT) и autorização (papéis/roles).
- [ ] **Gerenciamento de Faxineiras:** CRUD completo para os usuários do tipo "cleaner".
    - [x] Lógica de **Leitura** (`getAllCleaners`) implementada e protegida por papel.
    - [ ] Lógica de Criação (já coberta pela rota `/register`).
    - [ ] Lógica de Leitura por ID, Atualização e Deleção.
- [ ] **Gerenciamento de Tarefas:** CRUD completo para as tarefas de limpeza.
- [ ] **Upload de Fotos:** Endpoint para receber a foto de comprovação.

### 📝 Frontend - Painel Web (A Fazer)
- [ ] Estrutura inicial do projeto React.
- [ ] Tela de Login.
- [ ] Dashboard principal.
- [ ] Telas de CRUD para Unidades, Faxineiras e Tarefas.
- [ ] Componente para visualização da foto de comprovação.

### 📝 Frontend - App Mobile (A Fazer)
- [ ] Estrutura inicial do projeto React Native com Expo.
- [ ] Tela de Login.
- [ ] Tela com a lista de tarefas do dia.
- [ ] Tela de detalhes da tarefa com o checklist.
- [ ] Integração da câmera para a comprovação fotográfica.

---

## 🗺️ Roadmap Futuro (Pós-MVP)

Após a conclusão do MVP, a visão é evoluir o **TaskClean** com funcionalidades mais avançadas para agregar ainda mais valor ao produto.

- **Notificações em Tempo Real:** Enviar notificações push para as faxineiras quando uma nova tarefa for atribuída.
- **Dashboard com Relatórios:** Gráficos e análises para os gerentes sobre tempo médio de limpeza, avaliações, etc.
- **Sistema de Avaliação:** Permitir que gerentes avaliem a limpeza de cada tarefa concluída.
- **Múltiplos Níveis de Acesso:** Adicionar papéis como "Supervisor" com permissões diferentes das de "Gerente".
- **Internacionalização (i18n):** Adaptar o sistema para múltiplos idiomas.
- **Testes Automatizados:** Implementação de uma suíte de testes (unitários, integração e E2E) para garantir a qualidade e estabilidade do código.

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