using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
namespace SeminarWebservice2021.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        public AddressController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }
        [HttpGet]
        [Route("provinces")]
        public async Task<IActionResult> GetProvinces()
        {
            var client = _clientFactory.CreateClient("GiaoHangNhanhProduction");
            var provinces = await client.GetStringAsync("master-data/province");
            return Ok(provinces);
        }
        // GET : .../api/Address/district?province_id=202
        [HttpGet]
        [Route("districts")]
        public async Task<IActionResult> GetDistricts(int province_id)
        {
            var client = _clientFactory.CreateClient("GiaoHangNhanhProduction");
            var district = await client.GetStringAsync("master-data/district?province_id="+province_id);
            return Ok(district);
        }
        [HttpGet]
        [Route("wards")]
        public async Task<IActionResult> GetWards(int district_id)
        {
            var client = _clientFactory.CreateClient("GiaoHangNhanhProduction");
            var ward = await client.GetStringAsync("master-data/ward?district_id="+district_id);
            return Ok(ward);
        }

    }
}
