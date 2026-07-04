using HouseholdExpenses.Api.Models;

namespace HouseholdExpenses.Api.Dtos.Transacoes;

public class CriarTransacaoRequest
{
    public string? Descricao { get; set; }

    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    public int PessoaId { get; set; }
}
