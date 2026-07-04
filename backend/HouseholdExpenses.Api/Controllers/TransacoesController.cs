using HouseholdExpenses.Api.Dtos.Transacoes;
using HouseholdExpenses.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenses.Api.Controllers;

[ApiController]
[Route("api/transacoes")]
public class TransacoesController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public TransacoesController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpPost]
    public async Task<ActionResult<TransacaoResponse>> Criar(CriarTransacaoRequest request)
    {
        try
        {
            var transacao = await _transacaoService.CriarAsync(request);

            return Created("/api/transacoes", transacao);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { erro = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TransacaoResponse>>> Listar()
    {
        var transacoes = await _transacaoService.ListarAsync();

        return Ok(transacoes);
    }
}
