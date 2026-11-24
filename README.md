# KImóveis API

API REST para gestão de imóveis, usuários, categorias e agendamentos de visitas. O projeto demonstra uma aplicação backend em TypeScript com autenticação, controle de acesso por perfil, validação de dados e persistência relacional.

## Por que este projeto

Este projeto foi desenvolvido para resolver o fluxo completo de uma imobiliária:

- cadastro e autenticação de usuários;
- diferenciação entre usuários comuns e administradores;
- gerenciamento de imóveis e categorias;
- criação de endereços associados aos imóveis;
- agendamento de visitas durante dias úteis e horário comercial;
- prevenção de conflitos de agenda;
- consultas protegidas por regras de autorização.

## Principais diferenciais técnicos

- API REST construída com **Node.js**, **Express** e **TypeScript**
- Persistência com **PostgreSQL** e **TypeORM**
- Validação de entrada com **Zod**
- Autenticação stateless com **JWT**
- Senhas protegidas com hash via **bcryptjs**
- Soft delete de usuários
- Middleware para autenticação, autorização e regras de negócio
- TypeORM Query Builder para verificação de disponibilidade de agendamentos
- Testes de integração com **Jest** e **Supertest**
- Ambiente SQLite em memória para execução dos testes

## Stack

| Categoria | Tecnologias |
| --- | --- |
| Linguagem | TypeScript |
| Runtime | Node.js |
| Framework | Express |
| Banco de dados | PostgreSQL |
| ORM | TypeORM |
| Validação | Zod |
| Autenticação | JSON Web Token |
| Segurança de senha | bcryptjs |
| Testes | Jest, Supertest, SQLite |

## Modelo de dados

O domínio é organizado em cinco entidades principais:

- `User`: usuários da plataforma e nível de acesso administrativo
- `Address`: endereço único associado a um imóvel
- `Category`: classificação dos imóveis
- `RealEstate`: propriedades disponíveis para venda
- `Schedule`: agendamentos de visitas entre usuários e imóveis

![Diagrama entidade-relacionamento](./DER.jpg)

## Funcionalidades

### Usuários e autenticação

- cadastro de usuários com e-mail único;
- hash automático da senha na entidade;
- login com emissão de token JWT;
- listagem de usuários restrita a administradores;
- atualização com autorização para administradores ou para o próprio usuário;
- soft delete de usuários por administradores.

### Categorias e imóveis

- criação de categorias por administradores;
- consulta pública das categorias;
- consulta de imóveis por categoria;
- criação de imóveis com endereço e categoria associados;
- prevenção de cadastro de imóveis no mesmo endereço.

### Agendamento de visitas

- agendamento por usuários autenticados;
- identificação do usuário pelo token JWT;
- bloqueio de conflitos no mesmo imóvel;
- bloqueio de conflitos na agenda do mesmo usuário;
- validação de dias úteis;
- validação de horário comercial das 08:00 às 18:00;
- consulta dos agendamentos de um imóvel restrita a administradores.

## Endpoints

| Método | Endpoint | Responsabilidade | Acesso |
| --- | --- | --- | --- |
| `POST` | `/users` | Criar usuário | Público |
| `GET` | `/users` | Listar usuários | Administrador |
| `PATCH` | `/users/:id` | Atualizar usuário | Administrador ou próprio usuário |
| `DELETE` | `/users/:id` | Remover usuário | Administrador |
| `POST` | `/login` | Autenticar e gerar token | Público |
| `POST` | `/categories` | Criar categoria | Administrador |
| `GET` | `/categories` | Listar categorias | Público |
| `GET` | `/categories/:id/realEstate` | Listar imóveis de uma categoria | Público |
| `POST` | `/realEstate` | Criar imóvel | Administrador |
| `GET` | `/realEstate` | Listar imóveis | Público |
| `POST` | `/schedules` | Agendar visita | Usuário autenticado |
| `GET` | `/schedules/realEstate/:id` | Listar visitas de um imóvel | Administrador |

## Como executar

### Pré-requisitos

- Node.js
- npm
- PostgreSQL

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

```bash
cp .env.example .env
```

Exemplo do arquivo `.env`:

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
SECRET_KEY=sua-chave-secreta
```

### 3. Executar as migrations

```bash
npm run build
npm run typeorm migration:run -- -d dist/data-source.js
```

### 4. Iniciar o servidor

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

## Testes

Os testes de integração podem ser executados com SQLite em memória, sem precisar configurar o banco PostgreSQL para o ambiente de teste.

```bash
npm test
```

Para executar um arquivo específico:

```bash
npm test -- users/createUser.route.spec.ts
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento |
| `npm run build` | Compila o TypeScript para JavaScript |
| `npm start` | Executa a versão compilada |
| `npm test` | Executa a suíte de testes |
| `npm run typeorm` | Executa comandos do TypeORM CLI |

## Estrutura do projeto

```text
src/
├── __tests__/       # Testes de integração e mocks
├── controllers/     # Recepção das requisições HTTP
├── entities/        # Entidades TypeORM
├── interfaces/      # Tipos e interfaces TypeScript
├── middlewares/     # Autenticação e regras de acesso
├── migrations/      # Migrations do banco de dados
├── routers/         # Definição das rotas
├── schemas/         # Schemas de validação Zod
└── services/        # Regras de negócio
```

## Considerações de arquitetura

- as rotas delegam a lógica para controllers e services;
- os middlewares centralizam autenticação, autorização e validações reutilizáveis;
- os schemas Zod validam o contrato de entrada antes do processamento;
- as entidades representam o modelo persistido e seus relacionamentos;
- TypeORM Query Builder é utilizado nos pontos que exigem consultas condicionais de disponibilidade.
