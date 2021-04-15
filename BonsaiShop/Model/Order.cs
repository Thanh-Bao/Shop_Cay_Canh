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
        public int STT { set; get; }
       public int orderId { set; get; }

        public int userId { set; get; }

        public int timestamp { set; get; }
       
        public int totalMoney { set; get; }

        public string status { set; get; }

        public string paymentMethod { set; get; }

        [ForeignKey("userId")]
        public User user { set; get; }

        public ICollection<OrderDetail> orderDetails { get; set; }


    }
}
