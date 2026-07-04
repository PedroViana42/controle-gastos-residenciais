using HouseholdExpenses.Api.Dtos.Totais;

namespace HouseholdExpenses.Api.Services;

public interface ITotaisService
{
    Task<TotaisResponse> ConsultarAsync();
}
