using BonsaiShop.DB;
using BonsaiShop.DTO;
using BonsaiShop.Model;
using Microsoft.EntityFrameworkCore;
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


        public List<ProductDTO> GetProducts(int? page, bool? forAdmin)
        {
            int _page = 1;
            bool _forAdmin = false;
            List<ProductDTO> list = null;
            if (forAdmin != null && forAdmin == true)
            {
                _forAdmin = true;
            }
            if (page != null)
            {
                _page = (Int32)page;
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            // Ẩn hiện Số lượng mỗi sản phẩm
            if (_forAdmin)
            {
                list = context.Products
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .OrderByDescending(s => s.productId)
                .Select(s =>
               new ProductDTO
               {
                   name = s.name,
                   price = s.price,
                   quantity = s.quantity,
                   description = s.description,
                   height = s.height,
                   origin = s.origin
               }
            ).ToList();
            }
            else
            {
                list = context.Products
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .OrderByDescending(s => s.productId)
                .Select(s =>
               new ProductDTO
               {
                   name = s.name,
                   price = s.price,
                   quantity = null,
                   description = s.description,
                   height = s.height,
                   origin = s.origin
               }
            ).ToList();
            }

            return list;
        }

        public Product GetProduct(int id)
        {
            return context.Products.Find(id);
        }


        public bool CreateProduct(Product product)
        {
            try
            {
                context.Products.Add(product);
                context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool UpdateProduct(int id, Product product)
        {
            try
            {
                Product _product = context.Products.Find(id);
                if (_product == null)
                {
                    return false;
                }
                _product.name = product.name;
                _product.price = product.price;
                _product.quantity = product.quantity;
                _product.description = product.description;
                _product.height = product.height;
                _product.origin = product.origin;
                context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public bool ProductExist(int id)
        {
            return context.Products.Any(p => p.productId == id);
        }

    }
}
