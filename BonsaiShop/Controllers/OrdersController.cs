using BonsaiShop.DAO;
using BonsaiShop.BO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderDAO orderDAO;
        private readonly CheckOut checkout;
        public OrdersController(OrderDAO orderDAO, CheckOut checkout)
        {
            this.orderDAO = orderDAO;
            this.checkout = checkout;
        }

        [HttpPost]
        [Route("accept-purchase")]
        public IActionResult AcceptPurchase(string phone)
        {
            
                checkout.Purchase(phone);
                return Ok();
             
        }


    }
}
