using BonsaiShop.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DAO
{
    public class OrderDetailDAO
    {
        private readonly ApplicationDbContext dbcontext;

        public OrderDetailDAO(ApplicationDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
    }
}
