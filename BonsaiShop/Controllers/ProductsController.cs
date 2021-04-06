using Microsoft.AspNetCore.Mvc;
using BonsaiShop.Model;
using BonsaiShop.DAO;
using BonsaiShop.Filter;
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
        public IActionResult GetProductsForPublic(int? page)
        {
            try
            {
                var list = productDAO.GetProducts(page, false);
                int total = productDAO.GetTotalProducts();
                var result = new
                {
                    totalItem = total,
                    pageSize = Config.Const.PAGE_SIZE,
                    list = list
                };
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet("filter")]
        public IActionResult FilterProducts(int? page, [FromBody] FilterDTO condition)
        {
            try
            {
                var list = productDAO.ProductFilter(page, condition);
                int total = productDAO.totalResultFilter(condition);
                var result = new
                {
                    totalItem = total,
                    pageSize = Config.Const.PAGE_SIZE,
                    list = list
                };

                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: api/Products/Admin?page=[page]
        [HttpGet("Admin")]
        [AdministratorAuthorization]
        public IActionResult GetProductsForAdmin(int? page)
        {
            try
            {
                var list = productDAO.GetProducts(page, true);
                return Ok(list);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [AdministratorAuthorization]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            try
            {
                productDAO.CreateProduct(product);
                return StatusCode(201);
            }
            catch
            {
                return BadRequest();
            }
        }

        // Endpoint : PUT : api/Products/12342
        [HttpPut("{id}")]
        [AdministratorAuthorization]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            if (productDAO.UpdateProduct(id, product))
            {
                return NoContent();
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE: api/Products1/5
        [HttpDelete("{id}")]
        [AdministratorAuthorization]
        public IActionResult DeleteProduct(int id)
        {
            if (productDAO.Delete(id))
            {
                return NoContent();
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
