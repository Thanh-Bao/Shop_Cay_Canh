using BonsaiShop.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DAO
{
    public class OrderDAO
    {
        private readonly ApplicationDbContext dbcontext;


        public OrderDAO(ApplicationDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }
    }
}
