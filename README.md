# Controle de Gastos Residenciais

Sistema simples para controle de gastos residenciais, com API em ASP.NET Core, persistencia em SQLite e front-end em React com TypeScript.

## Tecnologias

- Back-end: ASP.NET Core Web API com C#
- Front-end: React, TypeScript, Vite e React Router
- Persistencia: Entity Framework Core com SQLite
- Testes: xUnit com SQLite em memoria

## Estrutura

- `backend/HouseholdExpenses.sln`: solucao .NET.
- `backend/HouseholdExpenses.Api`: API Web.
- `backend/HouseholdExpenses.Tests`: testes automatizados das regras principais.
- `frontend`: aplicacao React.

## Requisitos locais

- .NET SDK 6
- Node.js e npm

## Como executar a API

```powershell
cd backend\HouseholdExpenses.Api
dotnet run
```

Enderecos padrao:

- API HTTP: `http://localhost:5155`
- Swagger: `http://localhost:5155/swagger`
- Health check: `GET http://localhost:5155/health`

O banco SQLite e criado automaticamente como `household-expenses.db` na pasta da API.

## Como executar o front-end

```powershell
cd frontend
npm install
npm run dev
```

Endereco padrao:

- Front-end: `http://localhost:5173`

A URL da API pode ser configurada com a variavel de ambiente `VITE_API_BASE_URL`. Se ela nao for definida, o front-end usa `http://localhost:5155`.

Exemplo:

```powershell
$env:VITE_API_BASE_URL="http://localhost:5155"
npm run dev
```

## Configuracao de CORS

A API libera por padrao o front-end em `http://localhost:5173`.

Para alterar a origem permitida, configure `AllowedFrontendOrigin`.

Exemplo:

```powershell
$env:AllowedFrontendOrigin="http://localhost:5173"
dotnet run
```

## Funcionalidades

- Criar, listar e excluir pessoas.
- Criar e listar transacoes.
- Bloquear receitas para pessoas menores de 18 anos.
- Excluir transacoes relacionadas ao excluir uma pessoa.
- Consultar receitas, despesas e saldo por pessoa.
- Consultar totais gerais.

## Validacoes principais

- Nome da pessoa obrigatorio e nao vazio.
- Idade maior ou igual a zero.
- Descricao da transacao obrigatoria.
- Valor da transacao maior que zero.
- Tipo da transacao deve ser `Expense` ou `Income`.
- Pessoa vinculada a transacao deve existir.
- Menores de idade podem ter apenas despesas.

## Comandos de validacao

Back-end:

```powershell
dotnet build backend\HouseholdExpenses.sln
dotnet test backend\HouseholdExpenses.sln
```

Front-end:

```powershell
cd frontend
npm run build
```

## Observacoes

- Nao ha autenticacao.
- Nao ha edicao de pessoas ou transacoes.
- Nao ha exclusao de transacoes.
- Valores monetarios usam `decimal` no back-end.
