using HouseholdExpenses.Api.Models;
using HouseholdExpenses.Api.Services;
using HouseholdExpenses.Tests.Infrastructure;

namespace HouseholdExpenses.Tests.Services;

public class TotaisServiceTests
{
    [Fact]
    public async Task RelatorioCalculaTotaisPorPessoaIncluiPessoasSemTransacoesETotalGeral()
    {
        using var database = new TestDatabase();
        database.Context.Pessoas.AddRange(
            new Pessoa
            {
                Nome = "Adulto",
                Idade = 30,
                Transacoes =
                {
                    new Transacao
                    {
                        Descricao = "Salario",
                        Valor = 2500m,
                        Tipo = TipoTransacao.Income
                    },
                    new Transacao
                    {
                        Descricao = "Mercado",
                        Valor = 400.75m,
                        Tipo = TipoTransacao.Expense
                    }
                }
            },
            new Pessoa
            {
                Nome = "Menor",
                Idade = 12,
                Transacoes =
                {
                    new Transacao
                    {
                        Descricao = "Lanche",
                        Valor = 25.50m,
                        Tipo = TipoTransacao.Expense
                    }
                }
            },
            new Pessoa
            {
                Nome = "Sem Transacoes",
                Idade = 44
            });
        await database.Context.SaveChangesAsync();
        var service = new TotaisService(database.Context);

        var relatorio = await service.ConsultarAsync();

        var adulto = Assert.Single(relatorio.Pessoas, pessoa => pessoa.PessoaNome == "Adulto");
        Assert.Equal(2500m, adulto.TotalReceitas);
        Assert.Equal(400.75m, adulto.TotalDespesas);
        Assert.Equal(2099.25m, adulto.Saldo);

        var menor = Assert.Single(relatorio.Pessoas, pessoa => pessoa.PessoaNome == "Menor");
        Assert.Equal(0m, menor.TotalReceitas);
        Assert.Equal(25.50m, menor.TotalDespesas);
        Assert.Equal(-25.50m, menor.Saldo);

        var semTransacoes = Assert.Single(relatorio.Pessoas, pessoa => pessoa.PessoaNome == "Sem Transacoes");
        Assert.Equal(0m, semTransacoes.TotalReceitas);
        Assert.Equal(0m, semTransacoes.TotalDespesas);
        Assert.Equal(0m, semTransacoes.Saldo);

        Assert.Equal(2500m, relatorio.TotaisGerais.TotalReceitas);
        Assert.Equal(426.25m, relatorio.TotaisGerais.TotalDespesas);
        Assert.Equal(2073.75m, relatorio.TotaisGerais.Saldo);
    }
}
