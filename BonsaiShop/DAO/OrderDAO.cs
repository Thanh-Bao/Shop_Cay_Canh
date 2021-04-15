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
                    phone = userDAO.IdToPhone(s.userId),
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
                order => order.userId,
                user => user.userId,
                (_order, _user) => new { _order, _user }
                )
                .Where(s => s._user.userId == userDAO.PhoneToID(phone))
                .Select(s => new OrderDTO
                {
                    orderId = s._order.orderId,
                    phone = userDAO.IdToPhone(s._user.userId),
                    timestamp = s._order.timestamp,
                    totalMoney = s._order.totalMoney,
                    status = s._order.status,
                })
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .ToList();
            return list;
        }

        public bool ChangeStatusOrder(int id, string status)
        {
            try
            {
                if (status != Config.Const.OrderStatus.PENDING
                || status != Config.Const.OrderStatus.SHIPPING
                || status != Config.Const.OrderStatus.CANCEL
                    )
                {
                    return false;
                }
                Order order = dbcontext.Orders.Find(id);
                order.status = status;
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool AddOrder(int orderID, string phone)
        {
            try
            {
                Order order = new Order
                {
                    orderId = orderID,
                    userId = userDAO.PhoneToID(phone),
                    timestamp = (Int32)DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
                    status = Config.Const.OrderStatus.PENDING,
                    totalMoney = cartDAO.SumCart(phone),
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


        public bool AddOrderDetail(int orderID, OrderDetail orderdetail)
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


    }
}
