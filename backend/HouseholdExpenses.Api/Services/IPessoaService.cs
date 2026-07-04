using HouseholdExpenses.Api.Dtos.Pessoas;

namespace HouseholdExpenses.Api.Services;

public interface IPessoaService
{
    Task<PessoaResponse> CriarAsync(CriarPessoaRequest request);

    Task<IReadOnlyList<PessoaResponse>> ListarAsync();

    Task<bool> ExcluirAsync(int id);
}
