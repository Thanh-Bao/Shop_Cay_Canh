

namespace BonsaiShop.DTO
{
    public class ProductDTO
    {
        public int productID { set; get; }
        public string name { set; get; }
        public int price { set; get; }
        public int? quantity { set; get; }
        public string? thumbnail { set; get; }
        public string? detailImage { set; get; }
        public string description { set; get; }
        public int height { set; get; }
        public string origin { set; get; }
    }
}
