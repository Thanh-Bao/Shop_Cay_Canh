using BonsaiShop.Filter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BonsaiShop.Controllers
{
    [Route("api/[controller]")]
    public class MomoController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        public MomoController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }
        [HttpGet]
        [Authorize]
        [AdministratorAuthorization]
        public async Task<IActionResult> Get()
        {
            var client = _clientFactory.CreateClient("MoMo");
            var data = new
            {
                APIKey = "dac31eb977d03652ff8597b497d11d1c",
                limit = 400
            };
            var jsonData = JsonSerializer.Serialize(data);
            var stringData = new StringContent(jsonData, Encoding.UTF8, "application/json");
            var list = await client.PostAsync("lich-su-giao-dich.asp", stringData);
            return Ok(list.Content.ReadAsStringAsync().Result);
        }
    }
}
