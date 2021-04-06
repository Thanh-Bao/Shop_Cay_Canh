using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DTO
{
    public class FilterDTO
    {
        public string origin { set; get; }
        public int sort { set; get; }
        public RangeDTO priceRange { set; get; } 
        public RangeDTO heightRange { set; get; }
    }
}
