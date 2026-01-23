📸 Reactgram

O Reactgram é uma aplicação full-stack inspirada no Instagram, desenvolvida com React no frontend e Node.js + Express no backend, utilizando MongoDB como banco de dados.
O projeto implementa autenticação, gerenciamento de usuários, publicação de fotos, curtidas e comentários, simulando funcionalidades reais de uma rede social moderna.

🚀 Funcionalidades
👤 Usuário

Cadastro de usuário com validação

Login com autenticação via JWT

Upload e atualização de foto de perfil

Edição de dados do perfil

Busca de usuários

📷 Fotos

Upload de fotos com imagem

Feed com fotos de usuários

Curtidas em fotos

Comentários em fotos

Visualização de foto individual

🔐 Segurança

Rotas protegidas com middleware de autenticação

Validação de dados no backend

Controle de acesso por token

🧱 Arquitetura do Projeto

O projeto segue uma arquitetura full-stack desacoplada, com frontend e backend separados:

Reactgram/
├── backend   # API REST
└── frontend  # Aplicação React (SPA)

🛠️ Tecnologias Utilizadas
🖥️ Frontend

React

Redux Toolkit

React Router DOM

Hooks personalizados

Axios

CSS modularizado por componente/página

⚙️ Backend

Node.js

Express

MongoDB

Mongoose

JWT (JSON Web Token)

Multer (upload de imagens)

Express Validator

📁 Estrutura Detalhada do Backend
backend/
├── app.js                 # Arquivo principal da aplicação
├── config/
│   └── db.js              # Conexão com MongoDB
├── controllers/
│   ├── PhotoController.js # Regras de negócio das fotos
│   └── UserController.js  # Regras de negócio do usuário
├── middlewares/
│   ├── authGuard.js       # Proteção de rotas (JWT)
│   ├── handleValidation.js
│   ├── imageUpload.js     # Configuração do Multer
│   ├── photoValidation.js
│   └── userValidations.js
├── models/
│   ├── Photo.js           # Schema de fotos
│   └── User.js            # Schema de usuários
├── routes/
│   ├── router.js          # Roteador principal
│   ├── UserRoutes.js
│   └── photoroutes.js
└── uploads/
    ├── users/             # Fotos de perfil
    └── photos/            # Fotos publicadas


📌 O backend segue o padrão MVC, com clara separação entre:

Rotas

Controllers

Models

Middlewares

📁 Estrutura Detalhada do Frontend
frontend/src/
├── components/        # Componentes reutilizáveis
├── pages/             # Páginas da aplicação
│   ├── Auth/
│   ├── Home/
│   ├── Profile/
│   ├── Photo/
│   ├── Search/
│   └── EditProfile/
├── services/          # Comunicação com a API
│   ├── authService.jsx
│   ├── photoService.jsx
│   └── userService.jsx
├── slices/            # Redux Toolkit slices
│   ├── authSlice.jsx
│   ├── photoSlice.jsx
│   └── userSlice.jsx
├── hooks/             # Hooks personalizados
├── utils/
│   └── config.js      # URL base da API
├── store.js           # Configuração do Redux
└── App.js


📌 O frontend utiliza arquitetura por responsabilidade, separando:

Estado global (Redux)

Serviços de API

Componentes de UI

Páginas

⚙️ Como Executar o Projeto Localmente
🔽 Clonar o repositório
git clone https://github.com/RaphaelRosa74/Reactgram.git
cd Reactgram

▶️ Backend
cd backend
npm install
npm run dev


Crie um arquivo .env na pasta backend:

MONGO_URI=sua_uri_do_mongodb
JWT_SECRET=sua_chave_secreta
PORT=5000


A API estará disponível em:

http://localhost:5000

▶️ Frontend
cd frontend
npm install
npm start


A aplicação estará disponível em:

http://localhost:3000

🌍 Deploy

Frontend configurado para Vercel

Backend preparado para serviços como:

Render

Railway

Heroku

O projeto já possui build de produção no frontend.
