using BonsaiShop.DAO;
using BonsaiShop.DTO;
using BonsaiShop.Filter;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


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
        
        [HttpGet("count/{phone}")]
        [MemberAuthorization]
        public IActionResult GetToalCart(string phone)
        {
            try
            {
               int  count = cartDAO.GetTotalCart(phone);
                return Ok(count);
            }
            catch
            {
                return BadRequest();
            }
        }

        //  api/Cart/0965456545
        [HttpPut("{phone}")]
        [MemberAuthorization]
        public IActionResult UpdateCart(string phone, int productID)
        {
            try
            {
                cartDAO.AddCart(phone, productID);
                return NoContent();
            } catch
            {
                return BadRequest();
            }
        }

        //Example : ENPOINT : /api/Cart/0943417917?productID=2

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
