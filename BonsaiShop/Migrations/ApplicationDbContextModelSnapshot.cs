﻿// <auto-generated />
using System;
using BonsaiShop.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BonsaiShop.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BonsaiShop.Model.CartItem", b =>
                {
                    b.Property<string>("phone")
                        .HasColumnType("nvarchar(13)");

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.HasKey("phone", "productId");

                    b.HasIndex("productId");

                    b.ToTable("Cart");
                });

            modelBuilder.Entity("BonsaiShop.Model.Order", b =>
                {
                    b.Property<int>("orderId")
                        .HasColumnType("int");
             

                    b.Property<string>("paymentMethod")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phone")
                        .HasColumnType("nvarchar(13)");

                    b.Property<string>("status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("timestamp")
                        .HasColumnType("int");

                    b.Property<int>("totalMoney")
                        .HasColumnType("int");

                    b.HasKey("orderId");

                    b.HasIndex("phone");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("BonsaiShop.Model.OrderDetail", b =>
                {
                    b.Property<int>("orderId")
                        .HasColumnType("int");

                    b.Property<int>("productId")
                        .HasColumnType("int");

                    b.Property<int>("price")
                        .HasColumnType("int");

                    b.Property<int?>("quantity")
                        .HasColumnType("int");

                    b.HasKey("orderId", "productId");

                    b.HasIndex("productId");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("BonsaiShop.Model.Product", b =>
                {
                    b.Property<int>("productId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("detailImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("height")
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("origin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("price")
                        .HasColumnType("int");

                    b.Property<int?>("quantity")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<string>("thumbnail")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("productId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("BonsaiShop.Model.User", b =>
                {
                    b.Property<string>("phone")
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)");

                    b.Property<string>("address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("timestamp")
                        .HasColumnType("int");

                    b.HasKey("phone");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BonsaiShop.Model.CartItem", b =>
                {
                    b.HasOne("BonsaiShop.Model.User", "user")
                        .WithMany("carts")
                        .HasForeignKey("phone")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BonsaiShop.Model.Product", "product")
                        .WithMany("carts")
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("product");

                    b.Navigation("user");
                });

            modelBuilder.Entity("BonsaiShop.Model.Order", b =>
                {
                    b.HasOne("BonsaiShop.Model.User", "user")
                        .WithMany("orders")
                        .HasForeignKey("phone");

                    b.Navigation("user");
                });

            modelBuilder.Entity("BonsaiShop.Model.OrderDetail", b =>
                {
                    b.HasOne("BonsaiShop.Model.Order", "order")
                        .WithMany("orderDetails")
                        .HasForeignKey("orderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BonsaiShop.Model.Product", "product")
                        .WithMany("orderDetails")
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("order");

                    b.Navigation("product");
                });

            modelBuilder.Entity("BonsaiShop.Model.Order", b =>
                {
                    b.Navigation("orderDetails");
                });

            modelBuilder.Entity("BonsaiShop.Model.Product", b =>
                {
                    b.Navigation("carts");

                    b.Navigation("orderDetails");
                });

            modelBuilder.Entity("BonsaiShop.Model.User", b =>
                {
                    b.Navigation("carts");

                    b.Navigation("orders");
                });
#pragma warning restore 612, 618
        }
    }
}
