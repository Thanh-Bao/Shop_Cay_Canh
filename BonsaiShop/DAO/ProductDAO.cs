using BonsaiShop.DB;
using BonsaiShop.DTO;
using BonsaiShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;


namespace BonsaiShop.DAO
{
    public class ProductDAO
    {
        private readonly ApplicationDbContext dbcontext;

        public ProductDAO(ApplicationDbContext context)
        {
            this.dbcontext = context;
        }


        public int GetTotalProducts()
        {
            int total = dbcontext.Products.Select(p => p).Count();
            return total;
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
                list = dbcontext.Products
                .OrderByDescending(s => s.productId)
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .Select(s =>
               new ProductDTO
               {
                   productID = s.productId,
                   name = s.name,
                   price = s.price,
                   quantity = s.quantity,
                   thumbnail = s.thumbnail,
                   detailImage = s.detailImage,
                   description = s.description,
                   height = s.height,
                   origin = s.origin
               }
            ).ToList();
            }
            else
            {
                list = dbcontext.Products
                .OrderByDescending(s => s.productId)
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .Select(s =>
               new ProductDTO
               {
                   productID = s.productId,
                   name = s.name,
                   price = s.price,
                   quantity = null,
                   thumbnail = s.thumbnail,
                   detailImage = s.detailImage,
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
            return dbcontext.Products.Find(id);
        }


        public bool CreateProduct(Product product)
        {
            try
            {
                dbcontext.Products.Add(product);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public int totalResultFilter(FilterDTO condition)
        {


            int total = dbcontext.Products
                .Where(s =>
                  (s.height >= condition.heightRange.min)
                  && (s.height <= condition.heightRange.max)
                 && (s.price >= condition.priceRange.min)
                  && (s.price <= condition.priceRange.max)
                  && (s.origin.Contains(condition.origin))
              ).Select(s => s).Count();
            return total;
        }

        public List<ProductDTO> ProductFilter(int? page, FilterDTO condition)
        {


            int _page = 1;
            if (page != null)
            {
                _page = (Int32)page;
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            List<ProductDTO> list = null;
            list = dbcontext.Products
              .Where(s =>
                  (s.height >= condition.heightRange.min)
                  && (s.height <= condition.heightRange.max)
                  && (s.price >= condition.priceRange.min)
                  && (s.price <= condition.priceRange.max)
                  && (s.origin.Contains(condition.origin))
              )
              .Skip(Nskip)
              .Take(Config.Const.PAGE_SIZE)
              .Select(s =>
             new ProductDTO
             {
                 productID = s.productId,
                 name = s.name,
                 price = s.price,
                 quantity = null,
                 description = s.description,
                 height = s.height,
                 origin = s.origin
             }
          ).ToList();
            if (condition.sort == 1)
            {
                list.OrderByDescending(s => s.price);
            }
            else if (condition.sort == 2)
            {
                list.OrderByDescending(s => s.height);
            }
            else
            {
                list.OrderByDescending(s => s.productID);
            }
            return list;
        }


        public bool UpdateProduct(int id, Product product)
        {
            try
            {
                Product _product = dbcontext.Products.Find(id);
                if (_product == null)
                {
                    return false;
                }
                _product.name = product.name;
                _product.price = product.price;
                _product.quantity = product.quantity;
                _product.thumbnail = product.thumbnail;
                _product.detailImage = product.detailImage;
                _product.description = product.description;
                _product.height = product.height;
                _product.origin = product.origin;
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public int TotalItemSearchResult(string keyword)
        {
            var total = dbcontext.Products
                .Where(s => s.name.Contains(keyword)).Select(s => s).Count();
            return total;
        }

        public List<ProductDTO> SearchProduct(int? page, string keyword)
        {

            int _page = 1;
            if (page != null)
            {
                _page = (Int32)page;
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            var list = dbcontext.Products
                .Where(s => s.name.Contains(keyword))
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .OrderByDescending(s => s.productId)
                .Select(s => new ProductDTO
                {
                    productID = s.productId,
                    name = s.name,
                    price = s.price,
                    quantity = null,
                    thumbnail = s.thumbnail,
                    detailImage = s.detailImage,
                    description = s.description,
                    height = s.height,
                    origin = s.origin
                })
                .ToList();
            return list;
        }

        public bool Delete(int id)
        {
            try
            {
                var product = dbcontext.Products.Find(id);
                if (product == null)
                {
                    return false;
                }
                dbcontext.Products.Remove(product);
                dbcontext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<ProductDTO> GetRandomProducts()
        {

            int total = dbcontext.Products.Select(s => s).Count();
            int quantity = 3;
            int startIndex = 0;
            Random rnd = new Random();
            if (total >= 4)
            {
                startIndex = rnd.Next(1, total - quantity);
            } else
            {
                quantity = total;
            }
            var list = dbcontext.Products
               .Skip(startIndex)
              .Take(quantity)
              .Select(s => new ProductDTO
              {
                  productID = s.productId,
                  name = s.name,
                  price = s.price,
                  quantity = null,
                  thumbnail = s.thumbnail,
                  detailImage = s.detailImage,
                  description = s.description,
                  height = s.height,
                  origin = s.origin
              }).ToList();
            return list;
        }

        public bool ProductExist(int id)
        {
            return dbcontext.Products.Any(p => p.productId == id);
        }

    }
}
