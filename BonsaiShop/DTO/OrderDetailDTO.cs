

namespace BonsaiShop.DTO
{
    public class OrderDetailDTO
    {
        public string thumbnail { get; set; }
        public int productId { get; set; }
        public string productName { get; set; }
        public int productPrice { get; set; }
        public int? quantity { get; set; }
        public int? totalMoney { get; set; }
    }
}
