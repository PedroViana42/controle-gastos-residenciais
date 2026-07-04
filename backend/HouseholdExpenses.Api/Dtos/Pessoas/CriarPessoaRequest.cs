using System.ComponentModel.DataAnnotations;

namespace HouseholdExpenses.Api.Dtos.Pessoas;

public class CriarPessoaRequest
{
    [Required]
    public string? Nome { get; set; }

    public int Idade { get; set; }
}
