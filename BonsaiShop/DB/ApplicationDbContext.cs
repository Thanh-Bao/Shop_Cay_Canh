using BonsaiShop.Model;
using Microsoft.EntityFrameworkCore;

namespace BonsaiShop.DB
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { set; get; }
        public DbSet<Product> Products { set; get; }
        public DbSet<Order> Orders { set; get; }
        public DbSet<OrderDetail> OrderDetails { set; get; }
        public DbSet<CartItem> Cart { set; get; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetail>().HasKey(l => new { l.orderId, l.productId });
            modelBuilder.Entity<CartItem>().HasKey(l => new { l.userId, l.productId });
        }
    }
}
