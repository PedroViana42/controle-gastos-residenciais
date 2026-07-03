# Orientações do projeto

## Objetivo

Desenvolver um sistema simples de controle de gastos residenciais como teste técnico.

## Tecnologias obrigatórias

* Back-end: ASP.NET Core Web API com C#
* Front-end: React com TypeScript
* Persistência: Entity Framework Core com SQLite
* Controle de versão: Git

## Regras de trabalho

* Trabalhe em uma funcionalidade por vez.
* Antes de alterar arquivos, apresente um plano resumido.
* Não implemente funcionalidades fora da etapa solicitada.
* Após cada implementação, liste todos os arquivos criados ou alterados.
* Explique as decisões técnicas em linguagem simples.
* Execute build, testes e verificações disponíveis antes de concluir.
* Não esconda erros ou warnings.
* Não adicione dependências sem explicar a necessidade.
* Não use arquitetura excessivamente complexa para o tamanho do desafio.
* Não implemente autenticação.
* Não implemente edição de pessoas ou transações.
* Não implemente exclusão de transações.
* Nunca inclua nomes de empresas, recrutadores ou referências ao processo seletivo.
* Nunca inclua segredos, credenciais ou arquivos locais no Git.

## Regras de negócio

* Pessoas devem possuir identificador automático, nome e idade.
* Deve ser possível criar, listar e excluir pessoas.
* Ao excluir uma pessoa, todas as suas transações devem ser excluídas.
* Transações devem possuir identificador automático, descrição, valor, tipo e pessoa.
* Deve ser possível criar e listar transações.
* O tipo da transação deve ser receita ou despesa.
* A pessoa vinculada à transação deve existir.
* Pessoas menores de 18 anos podem possuir apenas despesas.
* O valor da transação deve ser maior que zero.
* A consulta de totais deve apresentar receitas, despesas e saldo de cada pessoa.
* Pessoas sem transações também devem aparecer na consulta de totais.
* A consulta deve apresentar também os totais gerais.

## Qualidade

* Use `decimal` para valores monetários.
* Use DTOs para entrada e saída da API.
* Coloque regras de negócio importantes no back-end.
* Evite comentários que apenas repetem o código.
* Comente decisões e regras que não sejam óbvias.
* Use nomes claros e consistentes.
* Mantenha controllers pequenos.
* Retorne códigos HTTP apropriados.
* Utilize operações assíncronas quando houver acesso ao banco.

## Validação de cada etapa

Antes de considerar uma tarefa concluída:

1. Execute o build.
2. Execute os testes disponíveis.
3. Informe os comandos utilizados.
4. Explique como testar manualmente.
5. Mostre qualquer erro ou limitação encontrada.