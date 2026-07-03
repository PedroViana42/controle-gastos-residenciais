# Controle de Gastos Residenciais

Sistema simples para controle de gastos residenciais.

## Estrutura inicial

- `backend/HouseholdExpenses.sln`: solução .NET.
- `backend/HouseholdExpenses.Api`: API ASP.NET Core Web API.

## Comandos utilizados nesta etapa

```powershell
New-Item -ItemType Directory -Path backend
dotnet new sln -n HouseholdExpenses
dotnet new webapi -n HouseholdExpenses.Api
dotnet sln add .\HouseholdExpenses.Api\HouseholdExpenses.Api.csproj
dotnet add .\HouseholdExpenses.Api\HouseholdExpenses.Api.csproj package Microsoft.EntityFrameworkCore.Sqlite --version 7.0.20
dotnet add .\HouseholdExpenses.Api\HouseholdExpenses.Api.csproj package Microsoft.EntityFrameworkCore.Design --version 7.0.20
dotnet build
```

## Como executar a API

```powershell
cd backend\HouseholdExpenses.Api
dotnet run
```

Depois de iniciar a API, acesse:

- `GET /health`: verifica se a API está respondendo.
- `/swagger`: documentação interativa da API em ambiente de desenvolvimento.
