using BonsaiShop.DB;
using BonsaiShop.DTO;
using BonsaiShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DAO
{
    public class CartDAO
    {
        private readonly ApplicationDbContext dbcontext;
        private readonly UserDAO userDAO;

        public CartDAO(ApplicationDbContext dbcontext, UserDAO userDAO)
        {
            this.dbcontext = dbcontext;
            this.userDAO = userDAO;
        }

        public List<ProductDTO> GetCart(string phone)
        {
            List<ProductDTO> list = dbcontext.Users.Join(
                dbcontext.Cart,
                user => user.userId,
                cart => cart.userId,
                (user, cart) => new { user, cart }
                ).Join(
                dbcontext.Products,
                userJoinCart => userJoinCart.cart.productId,
                product => product.productId,
                (userJoinCart, product) => new { userJoinCart, product }
                )
                .Where(s => s.userJoinCart.user.phone.Equals(phone))
                .Select(s => new ProductDTO
                {
                    productID = s.product.productId,
                    name = s.product.name,
                    price = s.product.price,
                    quantity = s.userJoinCart.cart.quantity
                })
                .ToList();
            return list;
        }

        public int GetTotalCart(string phone)
        {
            int totalItem = dbcontext.Users.Join(
                dbcontext.Cart,
                user => user.userId,
                cart => cart.userId,
                (user, cart) => new { user, cart }
                ).Join(
                dbcontext.Products,
                userJoinCart => userJoinCart.cart.productId,
                product => product.productId,
                (userJoinCart, product) => new { userJoinCart, product }
                )
                .Where(s => s.userJoinCart.user.phone.Equals(phone))
                .Sum(s => s.userJoinCart.cart.quantity)
                ;
            return totalItem;
        }


        public bool  UpdateCart(string phone, int productID)
        {
            try
            {
                if (!CartItemExist(phone, productID))
                {
                    Cart cart = new Cart
                    {
                        userId = userDAO.PhoneToID(phone),
                        productId = productID,
                        quantity = 1
                    };
                    dbcontext.Cart.Add(cart);
                     dbcontext.SaveChanges();
                }
                else
                {
                    Cart cart = dbcontext.Cart.Where(
                        s => s.userId == userDAO.PhoneToID(phone)
                        && s.productId == productID)
                        .FirstOrDefault();                         
                        cart.quantity += 1;
                     dbcontext.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }


        public bool CartItemExist(string phone, int productID)
        {
            bool isExist = dbcontext.Cart.Join(
                dbcontext.Users,
                cart => cart.userId,
                user => user.userId,
                (_cart, _user) => new { _cart, _user }
                ).Any(s => s._cart.productId == productID
                && s._user.phone.Equals(phone));
            return isExist;
        }

       
        public bool DeleteItemFromCart(string phone, int productID)
        {
            try
            {
                Cart cart = dbcontext.Cart.Find(userDAO.PhoneToID(phone), productID);
                dbcontext.Cart.Remove(cart);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteCart(string phone)
        {
            try
            {
                var cart = dbcontext.Cart.Where(s => s.userId == userDAO.PhoneToID(phone));
                dbcontext.Cart.RemoveRange(cart);
                dbcontext.SaveChanges();
                return true;
            } catch
            {
                return false;
            }
        }
        
    }
}
