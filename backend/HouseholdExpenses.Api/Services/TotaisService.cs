using HouseholdExpenses.Api.Data;
using HouseholdExpenses.Api.Dtos.Totais;
using HouseholdExpenses.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Api.Services;

public class TotaisService : ITotaisService
{
    private readonly AppDbContext _dbContext;

    public TotaisService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TotaisResponse> ConsultarAsync()
    {
        var pessoasComTransacoes = await _dbContext.Pessoas
            .AsNoTracking()
            .Include(pessoa => pessoa.Transacoes)
            .OrderBy(pessoa => pessoa.Id)
            .ToListAsync();

        var pessoas = pessoasComTransacoes
            .Select(pessoa => new PessoaTotalResponse
            {
                PessoaId = pessoa.Id,
                PessoaNome = pessoa.Nome,
                TotalReceitas = pessoa.Transacoes
                    .Where(transacao => transacao.Tipo == TipoTransacao.Income)
                    .Sum(transacao => transacao.Valor),
                TotalDespesas = pessoa.Transacoes
                    .Where(transacao => transacao.Tipo == TipoTransacao.Expense)
                    .Sum(transacao => transacao.Valor)
            })
            .ToList();

        foreach (var pessoa in pessoas)
        {
            pessoa.Saldo = pessoa.TotalReceitas - pessoa.TotalDespesas;
        }

        var totalReceitas = pessoas.Sum(pessoa => pessoa.TotalReceitas);
        var totalDespesas = pessoas.Sum(pessoa => pessoa.TotalDespesas);

        return new TotaisResponse
        {
            Pessoas = pessoas,
            TotaisGerais = new TotaisGeraisResponse
            {
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            }
        };
    }
}
