using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuildStatus.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CommitController : ControllerBase
  {
    readonly HttpClient client = new HttpClient();

    private async Task<Object> GetCommitsFromRepo(string owner, string repo, int perPage = 30)
    {

      client.DefaultRequestHeaders.Add("User-Agent", "Build-Status-Dashboard");
      var url = $"https://api.github.com/repos/{owner}/{repo}/commits?per_page={perPage}";
      // Console.WriteLine(url);
      var response = await client.GetAsync(url);
      string jsonString = await response.Content.ReadAsStringAsync();
      foreach (var header in response.Headers)
      {
        Console.WriteLine($"{header.Key} = {header.Value}");
        foreach (var value in header.Value)
        {
          Console.WriteLine($"{value}");
        }
      }
      var commits = JsonSerializer.Deserialize<List<Models.Root>>(jsonString);
      return commits;
    }

    [HttpGet("website")]
    [ResponseCache(Duration = 36000)]
    public async Task<ActionResult> GetWebsiteBuildStatusAsync([FromQuery] int perPage = 50)
    {
      var commits = await GetCommitsFromRepo("department-of-veterans-affairs", "vets-website", perPage);
      return Ok(new { commits });
    }
    [HttpGet("content")]
    [ResponseCache(Duration = 36000)]
    public async Task<ActionResult> GetContentBuildStatusAsync([FromQuery] int perPage = 50)
    {
      var commits = await GetCommitsFromRepo("department-of-veterans-affairs", "content-build", perPage);
      return Ok(new { commits });
    }
  }
}