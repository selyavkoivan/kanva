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

    [HttpPost]
    [RequestSizeLimit(100_000_000)]
    public void HandleImageByteArray(Dictionary<string, byte> imageBytesDictionary)
    {
        var imageBytes = imageBytesDictionary.Values.ToList();
        
        //do magic.ai
        
        return;
    }


}