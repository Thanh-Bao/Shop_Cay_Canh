using BonsaiShop.DAO;
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
        public OrdersController(OrderDAO orderDAO)
        {
            this.orderDAO = orderDAO;
        }
    }
}
