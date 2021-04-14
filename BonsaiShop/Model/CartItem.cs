using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Model
{
    public class CartItem
    {
        [Key]
        [Column(Order = 0)]
        public int userId { get; set; }
        [Key]
        [Column(Order = 1)]
        public int productId { get; set; }

        public int quantity { get; set; }

        [ForeignKey("userId")]
        public User user { get; set; }
        [ForeignKey("productId")]
        public Product product { get; set; }
    }
}
