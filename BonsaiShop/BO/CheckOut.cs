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

        public bool Purchase(string phone)
        {
            try
            {
                List<ProductDTO> cart = cartDAO.GetCart(phone);

                Random rnd = new Random();
                int orderIDrd = rnd.Next(10000, 999999);

                orderDAO.AddOrder(orderIDrd, phone);

                foreach (ProductDTO item in cart)
                {
                   
                }

                return true;
            } catch
            {
                return false;
            }
        }

    }
}
