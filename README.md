# HabitQuest Backend

Backend API para a aplicação HabitQuest, um sistema de rastreamento e gamificação de hábitos.

## Descrição

HabitQuest é uma aplicação que ajuda usuários a construir e manter bons hábitos através de um sistema de gamificação com níveis, streaks e categorias de hábitos.

## Estrutura do Projeto

```
├── config/              # Configurações da aplicação
├── controllers/         # Controllers para lógica de negócio
├── middlewares/         # Middlewares de autenticação e validação
├── models/              # Modelos de dados
├── routes/              # Definição de rotas da API
├── utils/               # Utilitários (cálculo de níveis, streaks)
├── index.js             # Arquivo principal da aplicação
└── package.json         # Dependências do projeto
```

## Requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd backend_habitQuest
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie o servidor:
```bash
npm start
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL=<sua-url-de-banco-de-dados>
JWT_SECRET=<sua-chave-secreta>
PORT=<porta-do-servidor>
```

## API Endpoints

### Categorias
- `GET /api/categories` - Listar todas as categorias
- `POST /api/categories` - Criar nova categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Deletar categoria

### Hábitos
- `GET /api/habits` - Listar todos os hábitos
- `POST /api/habits` - Criar novo hábito
- `PUT /api/habits/:id` - Atualizar hábito
- `DELETE /api/habits/:id` - Deletar hábito

### Perfil
- `GET /api/profile` - Obter perfil do usuário
- `PUT /api/profile` - Atualizar perfil do usuário

## Desenvolvimento

Para rodar em modo de desenvolvimento com auto-reload:
```bash
npm run dev
```

## Tecnologias Utilizadas

- Node.js
- Express.js
- JWT para autenticação
- Banco de dados (configurar conforme necessário)

## Contribuindo

Para contribuir com o projeto, crie uma branch para sua feature, faça suas alterações e abra um Pull Request.

## Licença

Este projeto está sob a licença MIT.
