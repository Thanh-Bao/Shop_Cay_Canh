using BonsaiShop.DAO;
using BonsaiShop.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartDAO cartDAO;

        public CartController(CartDAO cartDAO)
        {
            this.cartDAO = cartDAO;
        }

        // api/Cart/5
        [HttpGet("{phone}")]
        public IActionResult GetCart(string phone)
        {
            try
            {
                List<ProductDTO> list = cartDAO.GetCart(phone);
                return Ok(list);
            } catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{phone}")]
        public IActionResult UpdateCart(string phone)
        {
            try
            {

            } catch
            {
                return BadRequest();
            }
        }

    }
}
