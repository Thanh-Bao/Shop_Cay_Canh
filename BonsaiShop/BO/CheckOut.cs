using BonsaiShop.DAO;
using BonsaiShop.DTO;
using BonsaiShop.DB;
using BonsaiShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.BO
{
    public class CheckOut
    {
        private readonly ApplicationDbContext dbcontext;
        private readonly UserDAO userDAO;
        private readonly ProductDAO productDAO;
        private readonly OrderDAO orderDAO;
        private readonly CartDAO cartDAO;

        public CheckOut(ApplicationDbContext dbcontext, UserDAO userDAO, ProductDAO productDAO, OrderDAO orderDAO, CartDAO cartDAO)
        {
            this.dbcontext = dbcontext;
            this.userDAO = userDAO;
            this.productDAO = productDAO;
            this.orderDAO = orderDAO;
            this.cartDAO = cartDAO;
        }

        public bool Purchase(int orderId, string phone)
        {
            try
            {
                List<ProductDTO> cart = cartDAO.GetCart(phone);
                if (cart.Count() >= 1)
                {
                    orderDAO.AddOrder(orderId, phone);
                }
                foreach (ProductDTO item in cart)
                {
                    var orderDetail = new OrderDetail
                    {
                        orderId = orderId,
                        productId = item.productID,
                        quantity = item.quantity,
                        price = item.price
                    };
                    orderDAO.AddOrderDetail(orderDetail);
                    cartDAO.DeleteCart(phone);
                    dbcontext.SaveChanges();
                }
                return true;
            } catch
            {
                return false;
            }
        }

       

    }
}
