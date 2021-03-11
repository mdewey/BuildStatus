using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuildStatus.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BuildController : ControllerBase
  {

    static readonly HttpClient client = new HttpClient();


    private async Task<Object> GetStatusFromUrl(string url)
    {
      var response = await client.GetAsync(url);
      response.EnsureSuccessStatusCode();
      string responseBody = await response.Content.ReadAsStringAsync();
      // Above three lines can be replaced with new helper method below
      // string responseBody = await client.GetStringAsync(uri);

      var split = responseBody.Trim().Split('\n');
      var refString = split.First(f => f.Contains("REF="));
      var commit = refString.Split("=").Last();
      var data = new { commit, data = split, raw = responseBody, refString };
      return data;
    }

    [HttpGet]
    public async Task<ActionResult> GetBuildStatusAsync()
    {
      var staging = await GetStatusFromUrl("https://staging.va.gov/BUILD.txt");
      var production = await GetStatusFromUrl("https://www.va.gov/BUILD.txt");

      return Ok(new { staging, production });
    }
  }
}