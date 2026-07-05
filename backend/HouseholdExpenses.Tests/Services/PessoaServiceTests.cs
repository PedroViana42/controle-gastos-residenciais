using HouseholdExpenses.Api.Models;
using HouseholdExpenses.Api.Services;
using HouseholdExpenses.Tests.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Tests.Services;

public class PessoaServiceTests
{
    [Fact]
    public async Task ExcluirPessoaApagaTransacoesRelacionadas()
    {
        using var database = new TestDatabase();
        var pessoa = new Pessoa
        {
            Nome = "Adulto",
            Idade = 30,
            Transacoes =
            {
                new Transacao
                {
                    Descricao = "Mercado",
                    Valor = 100m,
                    Tipo = TipoTransacao.Expense
                }
            }
        };
        database.Context.Pessoas.Add(pessoa);
        await database.Context.SaveChangesAsync();
        var service = new PessoaService(database.Context);

        var excluiu = await service.ExcluirAsync(pessoa.Id);

        Assert.True(excluiu);
        Assert.Equal(0, await database.Context.Pessoas.CountAsync());
        Assert.Equal(0, await database.Context.Transacoes.CountAsync());
    }
}
