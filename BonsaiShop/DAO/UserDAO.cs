using BonsaiShop.DB;
using BonsaiShop.DTO;
using BonsaiShop.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DAO
{
    public class UserDAO
    {
        private readonly ApplicationDbContext context;


        public UserDAO(ApplicationDbContext context)
        {
            this.context = context;
        }

        public List<UserDTO> GetUsers(string role, string page)
        {
            int _page = 1;
            if (page != null)
            {
                _page = Int32.Parse(page);
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            var list = context.Users
                .Where(s => s.role.Equals(role))
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .OrderByDescending(s => s.userId)
                .Select(s => new UserDTO
                {
                    numberPhone = s.numberPhone,
                    name = s.name,
                    address = s.address
                })
                .ToList();
            return list;
        }

        public List<UserDTO> SearchUserByKeyWord(string keyword, string page)
        {
            int _page = 1;
            if (page != null)
            {
                _page = Int32.Parse(page);
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            var list = context.Users
                .Where(s => (s.numberPhone.Contains(keyword)
                           || s.address.Contains(keyword)
                           || s.name.Contains(keyword)
                          ) && s.role.Equals(Config.Const.Role.MEMBER)
                )
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .OrderByDescending(s => s.userId)
                .Select(s => new UserDTO
                {
                    numberPhone = s.numberPhone,
                    name = s.name,
                    address = s.address
                })
                .ToList();
            return list;
        }

        public UserDTO GetUser(string phone)
        {
            return context.Users.Where(s => s.numberPhone.Equals(phone))
                .Select(s => new UserDTO
                {
                    numberPhone = s.numberPhone,
                    name = s.name,
                    address = s.address
                }).FirstOrDefault();
        }

        public bool UserExists(string phone)
        {
            return context.Users.Any(e => e.numberPhone == phone);
        }

        public bool UpdateUser(string phone, UserDTO user)
        {
            try
            {
               User _user = context.Users.Where(
                    s => s.numberPhone.Equals(phone))
                    .FirstOrDefault();
                if (user.name != null)
                    _user.name = user.name;
                if (user.address != null)
                    _user.address = user.address;
                if (user.password != null)
                    _user.password = user.password;

                context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool CreateUser(User user)
        {
            try
            {
                if (user.numberPhone == null || user.password == null)
                {
                    return false;
                }
                context.Users.Add(user);
                context.SaveChangesAsync();
                return true;
            } catch
            {
                return false;
            }
        }


    }
}



