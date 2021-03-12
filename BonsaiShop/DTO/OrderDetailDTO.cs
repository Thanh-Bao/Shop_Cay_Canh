using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DTO
{
    public class OrderDetailDTO
    {
        public int productId { get; set; }
        public int productName { get; set; }
        public int productPrice { get; set; }
        public int quantity { get; set; }
        public int totalMoney { get; set; }
    }
}
