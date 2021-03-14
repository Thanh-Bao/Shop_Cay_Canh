using BonsaiShop.DB;
using BonsaiShop.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DAO
{
    public class OrderDetailDAO
    {
        private readonly ApplicationDbContext dbcontext;

        public OrderDetailDAO(ApplicationDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public List<ProductDTO> GetListProductInOrder(int orderID)
        {
            List<ProductDTO> list = dbcontext.OrderDetails
                .Join(
                dbcontext.Products,
                orderDetail => orderDetail.productId,
                product => product.productId,
                (orderDetail, product) => new { orderDetail, product }
                ).Where(
                combine => combine.orderDetail.orderId == orderID
                ).Select(s => new ProductDTO
                {
                    productID = s.product.productId,
                    name = s.product.name,
                    price = s.product.price,
                    quantity = s.product.quantity,
                    description = s.product.description,
                    height = s.product.height,
                    origin = s.product.origin
                })
            .ToList();
            return list;
        }

    }
}
