using BonsaiShop.DAO;
using BonsaiShop.DTO;
using BonsaiShop.Filter;
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

        // api/Cart/0965456545
        [HttpGet("{phone}")]
        [MemberAuthorization]
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

       //  api/Cart/0965456545
        [HttpPut("{phone}")]
        [MemberAuthorization]
        public IActionResult UpdateCart(string phone,[FromBody] int productID)
        {
            try
            {
                cartDAO.UpdateCart(phone, productID);
                return NoContent();
            } catch
            {
                return BadRequest();
            }
        }

        //  api/Cart/0965456545
        [HttpDelete("{phone}")]
        [MemberAuthorization]
        public IActionResult DeleteItemFromCart(string phone, [FromBody] int productID)
        {
            try
            {
                cartDAO.DeleteItemFromCart(phone, productID);
                return NoContent();
            } catch
            {
                return BadRequest();
            }
        }

    }
}
