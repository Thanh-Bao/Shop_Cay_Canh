using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DTO
{
    public class ProductDTO
    {
        public string name { set; get; }
        public string price { set; get; }
        public string quantity { set; get; }
        public string description { set; get; }
        public string height { set; get; }
        public string origin { set; get; }
    }
}
