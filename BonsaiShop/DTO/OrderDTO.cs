using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DTO
{
    public class OrderDTO
    {
        public int orderId { set; get; }
        public string phone { set; get; }
        public string name { set; get; }
        public string address { set; get; }
        public int timestamp { set; get; }
        public int totalMoney { set; get; }
        public string status { set; get; }
    }
}
