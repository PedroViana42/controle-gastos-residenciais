namespace HouseholdExpenses.Api.Dtos.Totais;

public class TotaisResponse
{
    public IReadOnlyList<PessoaTotalResponse> Pessoas { get; set; } = new List<PessoaTotalResponse>();

    public TotaisGeraisResponse TotaisGerais { get; set; } = new();
}
