using BonsaiShop.DB;
using BonsaiShop.DTO;
using BonsaiShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BonsaiShop.DAO
{
    public class OrderDAO
    {
        private readonly ApplicationDbContext dbcontext;
        private readonly UserDAO userDAO;
        private readonly CartDAO cartDAO;

        public OrderDAO(ApplicationDbContext dbcontext, UserDAO userDAO, CartDAO cartDAO)
        {
            this.dbcontext = dbcontext;
            this.userDAO = userDAO;
            this.cartDAO = cartDAO;
        }

        public int GetTotalCustomerOrders(string phone)
        {
            int total = dbcontext.Orders.Where(o => o.phone.Equals(phone)).Select(o => o).Count();
            return total;
        }

        public int AdminGetTotalCustomerOrders()
        {
            int total = dbcontext.Orders.Select(o => o).Count();
            return total;
        }

        public List<OrderDTO> GetOrders(int? page)
        {
            int _page = 1;
            if (page != null)
            {
                _page = (Int32)page;
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            List<OrderDTO> list = dbcontext.Orders
                .Select(s => new OrderDTO
                {
                    orderId = s.orderId,
                    phone = s.phone,
                    timestamp = s.timestamp,
                    totalMoney = s.totalMoney,
                    status = s.status,
                })
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .ToList();
            return list;
        }

        public List<OrderDTO> GetOrdersMember(string phone, int? page)
        {
            int _page = 1;
            if (page != null)
            {
                _page = (Int32)page;
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            List<OrderDTO> list = dbcontext.Orders
                .Join(
                dbcontext.Users,
                order => order.phone,
                user => user.phone,
                (_order, _user) => new { _order, _user }
                )
                 .OrderByDescending(combien => combien._order.timestamp)
                .Where(s => s._user.phone.Equals(phone))
                .Select(s => new OrderDTO
                {
                    orderId = s._order.orderId,
                    phone = phone,
                    timestamp = s._order.timestamp,
                    totalMoney = s._order.totalMoney,
                    status = s._order.status,
                    address = s._order.address,
                    paymentMethod = s._order.paymentMethod
                })
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .ToList();
            return list;
        }

        public List<OrderDTO> AdminGetOrdersMember( int? page)
        {
            int _page = 1;
            if (page != null)
            {
                _page = (Int32)page;
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            List<OrderDTO> list = dbcontext.Orders
                .Join(
                dbcontext.Users,
                order => order.phone,
                user => user.phone,
                (_order, _user) => new { _order, _user }
                )
                 .OrderByDescending(combien => combien._order.timestamp)
                .Select(s => new OrderDTO
                {
                    orderId = s._order.orderId,
                    phone = s._user.phone,
                    name = s._user.name,
                    timestamp = s._order.timestamp,
                    totalMoney = s._order.totalMoney,
                    status = s._order.status,
                    address = s._order.address,
                    paymentMethod = s._order.paymentMethod
                })
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .ToList();
            return list;
        }



        public bool AddOrder(int orderID, string phone)
        {
            try
            {
                Order order = new Order
                {
                    orderId = orderID,
                    phone = phone,
                    timestamp = (Int32)DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
                    status = Config.Const.OrderStatus.PENDING,
                    totalMoney = cartDAO.SumCart(phone),
                    address = userDAO.GetUser(phone).address,
                    paymentMethod = Config.Const.PaymentMethod.COD
                };
                dbcontext.Orders.Add(order);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public bool AddOrderDetail(OrderDetail orderdetail)
        {
            try
            {
                dbcontext.OrderDetails.Add(orderdetail);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        

        public bool CancelOrder(int orderID)
        {
            try
            {
                var order = dbcontext.Orders.Find(orderID);
                if (order.status.Equals(Config.Const.OrderStatus.PENDING))
                {
                    order.status = Config.Const.OrderStatus.CANCEL;
                    dbcontext.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        public List<OrderDetailDTO> GetOrderDetail(int orderID)
        {
            List<OrderDetailDTO> listProuctInOrder = dbcontext.OrderDetails
                .Join(
                dbcontext.Products,
                o => o.productId,
                p => p.productId,
                (order, product) => new { order, product }
                )
                .Where(combien => combien.order.orderId == orderID)
                .Select(combien => new OrderDetailDTO
                {

                    thumbnail = combien.product.thumbnail,
                    productId = combien.product.productId,
                    productName = combien.product.name,
                    productPrice = combien.product.price,
                    quantity = combien.order.quantity,
                    totalMoney = combien.order.quantity * combien.order.price
                }).ToList();

            return listProuctInOrder;
        }
    }
}
