using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Model
{
    public class OrderDetail
    {
        [Key]
        [Column(Order = 0)]
        public int orderId { get; set; }
        [Key]
        [Column(Order = 1)]
        public int productId { get; set; }

        public int quantity { get; set; }

        public int totalMoney { get; set; }

        [ForeignKey("orderId")]
        public Order order { get; set; }
        [ForeignKey("productId")]
        public Product product  { get; set; }


    }
}
