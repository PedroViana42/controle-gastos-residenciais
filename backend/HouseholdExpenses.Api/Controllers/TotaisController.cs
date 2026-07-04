using HouseholdExpenses.Api.Dtos.Totais;
using HouseholdExpenses.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace HouseholdExpenses.Api.Controllers;

[ApiController]
[Route("api/totais")]
public class TotaisController : ControllerBase
{
    private readonly ITotaisService _totaisService;

    public TotaisController(ITotaisService totaisService)
    {
        _totaisService = totaisService;
    }

    [HttpGet]
    public async Task<ActionResult<TotaisResponse>> Consultar()
    {
        var totais = await _totaisService.ConsultarAsync();

        return Ok(totais);
    }
}
