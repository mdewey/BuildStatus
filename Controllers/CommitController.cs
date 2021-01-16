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
    static readonly HttpClient client = new HttpClient();

    private async Task<Object> GetCommitsFromRepo(string owner, string repo)
    {
      //   var response = await client.GetAsync($"https://api.github.com/repos/{owner}/{repo}/commits");
      client.DefaultRequestHeaders.Add("User-Agent", "Build-Status-Dashboard");
      // client.DefaultRequestHeaders.Authorization.Parameter;
      var response = await client.GetAsync($"https://api.github.com/repos/department-of-veterans-affairs/vets-website/commits");
      //   response.EnsureSuccessStatusCode();
      string jsonString = await response.Content.ReadAsStringAsync();
      // Console.WriteLine(jsonString);
      foreach (var header in response.Headers)
      {
        Console.WriteLine($"{header.Key} = {header.Value}");
        foreach (var value in header.Value)
        {
          Console.WriteLine($"{value}");
        }
      }


      var commits = JsonSerializer.Deserialize<List<Models.Root>>(jsonString);

      // Above three lines can be replaced with new helper method below
      // string responseBody = await client.GetStringAsync(uri);

      //   var split = responseBody.Trim().Split('\n');
      //   var refString = split.First(f => f.Contains("REF="));
      //   var commit = refString.Split("=").Last();
      //   var data = new { commit, staging = split, raw = responseBody, refString };
      return commits;
    }

    [HttpGet]
    public async Task<ActionResult> GetBuildStatusAsync()
    {
      var commits = await GetCommitsFromRepo("department-of-veterans-affairs", "vets-website");
      return Ok(new { commits });
    }
  }
}