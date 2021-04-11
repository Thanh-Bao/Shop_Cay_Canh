using BonsaiShop.DB;
using BonsaiShop.DTO;
using BonsaiShop.Model;
using System;
using System.Collections.Generic;
using System.Linq;


namespace BonsaiShop.DAO
{
    public class UserDAO
    {
        private readonly ApplicationDbContext dbcontext;


        public UserDAO(ApplicationDbContext context)
        {
            this.dbcontext = context;
        }

        public List<UserDTO> GetUsers(string role, int? page)
        {
            int _page = 1;
            if (page != null)
            {
                _page =(Int32) page;
            }
            //Bỏ N phần tử đầu tiên
            int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;
            var list = dbcontext.Users
                .Where(s => s.role.Equals(role))
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .OrderByDescending(s => s.userId)
                .Select(s => new UserDTO
                {
                    phone = s.phone,
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
            var list = dbcontext.Users
                .Where(s => (s.phone.Contains(keyword)
                           || s.address.Contains(keyword)
                           || s.name.Contains(keyword)
                          ) && s.role.Equals(Config.Const.Role.MEMBER)
                )
                .Skip(Nskip)
                .Take(Config.Const.PAGE_SIZE)
                .OrderByDescending(s => s.userId)
                .Select(s => new UserDTO
                {
                    phone = s.phone,
                    name = s.name,
                    address = s.address
                })
                .ToList();
            return list;
        }

        public UserDTO GetUser(string phone)
        {
            return dbcontext.Users.Where(s => s.phone.Equals(phone))
                .Select(s => new UserDTO
                {
                    phone = s.phone,
                    name = s.name,
                    address = s.address
                }).FirstOrDefault();
        }

        public bool UserExists(string phone)
        {
            return dbcontext.Users.Any(e => e.phone == phone);
        }

        public bool UpdateUser(string phone,UserDTO user)
        {
            try
            {
               User _user = dbcontext.Users.Where(
                    s => s.phone.Equals(phone))
                    .FirstOrDefault();
                if (user.name != null)
                    _user.name = user.name;
                if (user.address != null)
                    _user.address = user.address;
                if (user.password != null)
                    _user.password = user.password;

                dbcontext.SaveChangesAsync();
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
                if (user.phone == null || user.password == null)
                {
                    return false;
                }
                dbcontext.Users.Add(user);
                dbcontext.SaveChangesAsync();
                return true;
            } catch
            {
                return false;
            }
        }

        public string login(string phone, string password)
        {
            if (!UserExists(phone))
            {
                return "Số điện thoại chưa đăng kí";
            }

            User templeUser = dbcontext.Users
                .Where(s => s.phone.Equals(phone))
                .FirstOrDefault();

            if (!password.Equals(templeUser.password))
            {
                return "Số điện thoại hoặc mật khẩu không đúng";
            }

            return templeUser.role;
        }

        public int PhoneToID(string phone)
        {
            User user = dbcontext.Users.Where(s => s.phone.Equals(phone)).FirstOrDefault();
            return user.userId;
        }

        public string IdToPhone(int id)
        {
            User user = dbcontext.Users.Find(id);
            return user.phone;
        }

    }
}



