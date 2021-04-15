using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Config
{
    public class Const
    {
        public static class Role
        {
            public const string ADMIN = "Admin";
            public const string MEMBER = "Member";
        }

        public static class OrderStatus
        {
            public const string PENDING = "Pending";
            public const string SHIPPING = "Shipping";
            public const string FINISH = "finish";
            public const string CANCEL = "Cancel";
        }

        public static class PaymentMethod
        {
            public const string COD = "COD";
            public const string Banking = "BANKING";

        }

        public const int PAGE_SIZE = 6;
    }


}
