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

        // api/CartItem/0965456545
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
        public IActionResult GetTotalCart(string phone)
        {
            try
            {
               int  count = cartDAO.GetTotalCart(phone);
                int sum = cartDAO.SumCart(phone);
                var data = new
                {
                    count = count,
                    sum = sum
                };
                return Ok(data);
            }
            catch
            {
                return BadRequest();
            }
        }

        //  api/CartItem/0965456545
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

        [HttpPatch("{phone}")]
        [MemberAuthorization]
        public IActionResult SubtractCart(string phone, int productID)
        {
            try
            {
                cartDAO.SubtractCart(phone, productID);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        //Example : ENPOINT : /api/CartItem/0943417917?productID=2

        //  api/CartItem/0965456545
        [HttpDelete("{phone}")]
        [MemberAuthorization]
        public IActionResult DeleteItemFromCart(string phone, int productID)
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


//LỖI 405 ISS PLEASK

/*ASP.NET or.NET Core application that uses Web API (for example, Swagger UI) is used on a domain;

When using the HTTP PUT method in this application, one of the following errors is returned:

405 - HTTP verb used to access this page is not allowed.

HTTP Error 405.0 - Method Not Allowed

Cause
WebDAV and .NET Core IIS handlers conflict. For more information, visit this Microsoft article.

Resolution
Disable WebDAV module and its headers from the website configuration:

Connect to a Plesk server via RDP.

Add the following content to the file %plesk\vhosts%\example.com\httpdocs\web.conf in the section <system.webServer> </system.webServer>:

< modules >
< remove name = "WebDAVModule" />
 </ modules >
 < handlers >
<remove name="OPTIONSVerbHandler"/>
 < remove name = "WebDAV" />
  </ handlers >

  Note: Alternatively, you can find this file in Plesk > Domains > example.com > File Manager.

Open IIS Manager via Server Manager >  Tools > Internet Information Services (IIS).

Restart website in SERVERNAME > Sites > example.com > the Restart button on the right side bar.*/