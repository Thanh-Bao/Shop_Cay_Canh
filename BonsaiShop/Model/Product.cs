﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Model
{
    public class Product
    {
        [Key]
        public int productId { set; get; }
        [Required]
        public string name { set; get; }

        [Required]
        public string price { set; get; }

        [Required]
        public string quantity { set; get; }

        public string description { set; get; }

        public string height { set; get; }

        public string origin { set; get; }

        public ICollection<OrderDetail> orderDetails { get; set; }
    }
}