using HouseholdExpenses.Api.Dtos.Transacoes;

namespace HouseholdExpenses.Api.Services;

public interface ITransacaoService
{
    Task<TransacaoResponse> CriarAsync(CriarTransacaoRequest request);

    Task<IReadOnlyList<TransacaoResponse>> ListarAsync();
}
