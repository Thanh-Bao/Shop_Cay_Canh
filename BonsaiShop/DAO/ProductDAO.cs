using BonsaiShop.DB;
using BonsaiShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DAO
{
    public class ProductDAO
    {
        private readonly ApplicationDbContext context;

        public ProductDAO(ApplicationDbContext context)
        {
            this.context = context;
        }

        /*public List<Product> GetProducts(string page)
        {
            int _page = 1;
            if (page != null)
            {
                _page = Int32.Parse(page);
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            var list = context.Product
        }*/
       
    }
}
