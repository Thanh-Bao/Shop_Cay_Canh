using BonsaiShop.DB;
using BonsaiShop.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.DAO
{
    public class UserDAO
    {
        private readonly ApplicationDbContext _context;


        public UserDAO(ApplicationDbContext context)
        {
            _context = context;
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
                var list = _context.Users
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
        }
    }

