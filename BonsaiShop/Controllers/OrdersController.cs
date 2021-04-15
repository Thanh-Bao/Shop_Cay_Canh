using BonsaiShop.DAO;
using BonsaiShop.BO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;

namespace BonsaiShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderDAO orderDAO;
        private readonly CheckOut checkout;
        private readonly IHttpClientFactory _clientFactory;
        public OrdersController(OrderDAO orderDAO, CheckOut checkout, IHttpClientFactory clientFactory)
        {
            this.orderDAO = orderDAO;
            this.checkout = checkout;
            _clientFactory = clientFactory;
        }
        [HttpPost]
        [Route("accept-purchase")]
        public IActionResult AcceptPurchase(string phone)
        {           
            try
            {
                Random rnd = new Random();
                int orderIDrd = rnd.Next(10000, 999999);
                checkout.Purchase(orderIDrd,phone);
                return Ok(orderIDrd);
            } catch
            {
                return BadRequest();
            }            
        }



        [HttpPost]
        [Route("check-transfer")]
        public async Task<IActionResult> CheckTranfer(int orderID)
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
            return Ok(list.Content.ReadAsStringAsync().Result.Contains(orderID.ToString()));
        }

    }
}
