using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BonsaiShop.DB;
using BonsaiShop.Model;
using BonsaiShop.DAO;
using BonsaiShop.DTO;

namespace BonsaiShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDAO productDAO;

        public ProductsController(ProductDAO productDAO)
        {
            this.productDAO = productDAO;
        }

        // GET: api/Products?page=[page]
        [HttpGet]
        public IActionResult GetProducts(int? page, bool? forAdmin)
        {
            try
            {
                var list = productDAO.GetProducts(page, forAdmin);
                return Ok(list);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            try
            {
                productDAO.CreateProduct(product);
                return StatusCode(201);
            } catch
            {
                return BadRequest();
            }
        }

        // Endpoint : PUT : api/Products/12342
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id,[FromBody] Product product)
        {
            try
            {
                productDAO.UpdateProduct(id, product);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
