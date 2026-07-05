using HouseholdExpenses.Api.Dtos.Transacoes;
using HouseholdExpenses.Api.Models;
using HouseholdExpenses.Api.Services;
using HouseholdExpenses.Tests.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Tests.Services;

public class TransacaoServiceTests
{
    [Fact]
    public async Task MenorDeIdadePodeCadastrarDespesa()
    {
        using var database = new TestDatabase();
        var pessoa = await CriarPessoaAsync(database, idade: 12);
        var service = new TransacaoService(database.Context);

        var response = await service.CriarAsync(new CriarTransacaoRequest
        {
            Descricao = "Lanche",
            Valor = 25.50m,
            Tipo = TipoTransacao.Expense,
            PessoaId = pessoa.Id
        });

        Assert.Equal(TipoTransacao.Expense, response.Tipo);
        Assert.Equal(25.50m, response.Valor);
        Assert.Equal(1, await database.Context.Transacoes.CountAsync());
    }

    [Fact]
    public async Task MenorDeIdadeNaoPodeCadastrarReceita()
    {
        using var database = new TestDatabase();
        var pessoa = await CriarPessoaAsync(database, idade: 12);
        var service = new TransacaoService(database.Context);

        await Assert.ThrowsAsync<ArgumentException>(() => service.CriarAsync(new CriarTransacaoRequest
        {
            Descricao = "Mesada",
            Valor = 100m,
            Tipo = TipoTransacao.Income,
            PessoaId = pessoa.Id
        }));

        Assert.Equal(0, await database.Context.Transacoes.CountAsync());
    }

    [Fact]
    public async Task AdultoPodeCadastrarReceita()
    {
        using var database = new TestDatabase();
        var pessoa = await CriarPessoaAsync(database, idade: 30);
        var service = new TransacaoService(database.Context);

        var response = await service.CriarAsync(new CriarTransacaoRequest
        {
            Descricao = "Salario",
            Valor = 2500m,
            Tipo = TipoTransacao.Income,
            PessoaId = pessoa.Id
        });

        Assert.Equal(TipoTransacao.Income, response.Tipo);
        Assert.Equal(2500m, response.Valor);
        Assert.Equal(1, await database.Context.Transacoes.CountAsync());
    }

    [Fact]
    public async Task TransacaoExigePessoaExistente()
    {
        using var database = new TestDatabase();
        var service = new TransacaoService(database.Context);

        await Assert.ThrowsAsync<InvalidOperationException>(() => service.CriarAsync(new CriarTransacaoRequest
        {
            Descricao = "Mercado",
            Valor = 120m,
            Tipo = TipoTransacao.Expense,
            PessoaId = 999
        }));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-10)]
    public async Task ValorDaTransacaoDeveSerPositivo(decimal valor)
    {
        using var database = new TestDatabase();
        var pessoa = await CriarPessoaAsync(database, idade: 30);
        var service = new TransacaoService(database.Context);

        await Assert.ThrowsAsync<ArgumentException>(() => service.CriarAsync(new CriarTransacaoRequest
        {
            Descricao = "Compra",
            Valor = valor,
            Tipo = TipoTransacao.Expense,
            PessoaId = pessoa.Id
        }));
    }

    private static async Task<Pessoa> CriarPessoaAsync(TestDatabase database, int idade)
    {
        var pessoa = new Pessoa
        {
            Nome = $"Pessoa {idade}",
            Idade = idade
        };

        database.Context.Pessoas.Add(pessoa);
        await database.Context.SaveChangesAsync();

        return pessoa;
    }
}
