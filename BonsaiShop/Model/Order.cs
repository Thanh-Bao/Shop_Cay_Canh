using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Model
{
    public class Order
    {
        [Key]
        public int orderId { set; get; }

        public string phone { set; get; }

        public string address { set; get; }

        public int timestamp { set; get; }

        public int totalMoney { set; get; }

        public string status { set; get; }

        public string paymentMethod { set; get; }

        [ForeignKey("phone")]
        public User user { set; get; }

        public ICollection<OrderDetail> orderDetails { get; set; }


    }
}
