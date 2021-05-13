using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BuildStatus.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BuildController : ControllerBase
  {

    static HttpClient client;


    public IConfiguration Configuration { get; }
    public BuildController(IConfiguration configuration)
    {
      Configuration = configuration;

      if (client == null)
      {
        HttpClientHandler handler = new HttpClientHandler()
        {
          AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
        };
        client = new HttpClient(handler);
      }
    }
    private async Task<Object> GetStatusFromUrl(string url)
    {
      var response = await client.GetAsync(url);
      response.EnsureSuccessStatusCode();
      var responseBody = await response.Content.ReadAsStringAsync();

      var split = responseBody.Trim().Split('\n');
      var refString = split.First(f => f.Contains("REF="));
      var commit = refString.Split("=").Last();
      var data = new { commit, data = split, raw = responseBody, refString };
      return data;
    }

    [HttpGet]
    public async Task<ActionResult> GetBuildStatusAsync()
    {
      var stagingUrl = Configuration["STAGING_BUILD_URL"];
      var prodUrl = Configuration["PROD_BUILD_URL"];

      var staging = await GetStatusFromUrl(stagingUrl);
      var production = await GetStatusFromUrl(prodUrl);

      return Ok(new { staging, production });
    }
  }
}