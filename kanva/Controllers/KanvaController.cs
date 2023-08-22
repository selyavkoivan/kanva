using Microsoft.AspNetCore.Mvc;

namespace ai.kanva.Controllers;

[ApiController]
[Route("api/kanva")]
public class KanvaController : ControllerBase
{
    private readonly ILogger<KanvaController> _logger;

    public KanvaController(ILogger<KanvaController> logger)
    {
        _logger = logger;
    }

    [HttpPost("HandleImageByteArray")]
    public void HandleImageByteArray(object? imageBytes)
    {
        return;
    }


}