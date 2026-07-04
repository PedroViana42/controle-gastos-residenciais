using HouseholdExpenses.Api.Data;
using HouseholdExpenses.Api.Dtos.Transacoes;
using HouseholdExpenses.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Api.Services;

public class TransacaoService : ITransacaoService
{
    private readonly AppDbContext _dbContext;

    public TransacaoService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TransacaoResponse> CriarAsync(CriarTransacaoRequest request)
    {
        var descricao = request.Descricao?.Trim();

        if (string.IsNullOrWhiteSpace(descricao))
        {
            throw new ArgumentException("Descricao e obrigatoria.", nameof(request));
        }

        if (request.Valor <= 0)
        {
            throw new ArgumentException("Valor deve ser maior que zero.", nameof(request));
        }

        if (!Enum.IsDefined(typeof(TipoTransacao), request.Tipo))
        {
            throw new ArgumentException("Tipo deve ser Expense ou Income.", nameof(request));
        }

        var pessoa = await _dbContext.Pessoas.FindAsync(request.PessoaId);

        if (pessoa is null)
        {
            throw new InvalidOperationException("Pessoa informada nao existe.");
        }

        if (pessoa.Idade < 18 && request.Tipo == TipoTransacao.Income)
        {
            throw new ArgumentException("Pessoas menores de 18 anos nao podem receber transacoes do tipo Income.", nameof(request));
        }

        var transacao = new Transacao
        {
            Descricao = descricao,
            Valor = request.Valor,
            Tipo = request.Tipo,
            PessoaId = pessoa.Id
        };

        _dbContext.Transacoes.Add(transacao);
        await _dbContext.SaveChangesAsync();

        return MapearTransacao(transacao, pessoa.Nome);
    }

    public async Task<IReadOnlyList<TransacaoResponse>> ListarAsync()
    {
        return await _dbContext.Transacoes
            .AsNoTracking()
            .Include(transacao => transacao.Pessoa)
            .OrderBy(transacao => transacao.Id)
            .Select(transacao => new TransacaoResponse
            {
                Id = transacao.Id,
                Descricao = transacao.Descricao,
                Valor = transacao.Valor,
                Tipo = transacao.Tipo,
                PessoaId = transacao.PessoaId,
                PessoaNome = transacao.Pessoa.Nome
            })
            .ToListAsync();
    }

    private static TransacaoResponse MapearTransacao(Transacao transacao, string pessoaNome)
    {
        return new TransacaoResponse
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = transacao.PessoaId,
            PessoaNome = pessoaNome
        };
    }
}
