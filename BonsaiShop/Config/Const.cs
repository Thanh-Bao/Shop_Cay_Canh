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
            public const string CANCEL = "Cancel";
        }

        public const int PAGE_SIZE = 4;
    }


}
