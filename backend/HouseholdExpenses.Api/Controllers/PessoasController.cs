using HouseholdExpenses.Api.Dtos.Pessoas;
using HouseholdExpenses.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenses.Api.Controllers;

[ApiController]
[Route("api/pessoas")]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoasController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpPost]
    public async Task<ActionResult<PessoaResponse>> Criar(CriarPessoaRequest request)
    {
        try
        {
            var pessoa = await _pessoaService.CriarAsync(request);

            return Created("/api/pessoas", pessoa);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { erro = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PessoaResponse>>> Listar()
    {
        var pessoas = await _pessoaService.ListarAsync();

        return Ok(pessoas);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var excluiu = await _pessoaService.ExcluirAsync(id);

        if (!excluiu)
        {
            return NotFound();
        }

        return NoContent();
    }
}
