using HouseholdExpenses.Api.Data;
using HouseholdExpenses.Api.Dtos.Pessoas;
using HouseholdExpenses.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HouseholdExpenses.Api.Services;

public class PessoaService : IPessoaService
{
    private readonly AppDbContext _dbContext;

    public PessoaService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PessoaResponse> CriarAsync(CriarPessoaRequest request)
    {
        var nome = request.Nome?.Trim();

        if (string.IsNullOrWhiteSpace(nome))
        {
            throw new ArgumentException("Nome e obrigatorio.", nameof(request));
        }

        if (request.Idade < 0)
        {
            throw new ArgumentException("Idade deve ser maior ou igual a zero.", nameof(request));
        }

        var pessoa = new Pessoa
        {
            Nome = nome,
            Idade = request.Idade
        };

        _dbContext.Pessoas.Add(pessoa);
        await _dbContext.SaveChangesAsync();

        return MapearPessoa(pessoa);
    }

    public async Task<IReadOnlyList<PessoaResponse>> ListarAsync()
    {
        return await _dbContext.Pessoas
            .AsNoTracking()
            .OrderBy(pessoa => pessoa.Id)
            .Select(pessoa => new PessoaResponse
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            })
            .ToListAsync();
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var pessoa = await _dbContext.Pessoas.FindAsync(id);

        if (pessoa is null)
        {
            return false;
        }

        _dbContext.Pessoas.Remove(pessoa);
        await _dbContext.SaveChangesAsync();

        return true;
    }

    private static PessoaResponse MapearPessoa(Pessoa pessoa)
    {
        return new PessoaResponse
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        };
    }
}
