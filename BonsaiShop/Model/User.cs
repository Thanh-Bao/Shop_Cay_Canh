using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Model
{
    public class User
    {
       
        [Key]
        [Required(ErrorMessage = "Please enter corect number phone"), MaxLength(13)]
        public string phone { set; get; }
        public string name { set; get; }
        public string address { set; get; }
        [Required]
        public string password { set; get; }
        public string role { set; get; }
        public int timestamp { set; get; }

        public ICollection<Order> orders { get; set; }
        public ICollection<CartItem> carts { get; set; }

    }
}
