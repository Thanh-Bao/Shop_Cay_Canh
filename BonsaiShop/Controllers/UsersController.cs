﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BonsaiShop.Model;
using Microsoft.AspNetCore.Authorization;
using BonsaiShop.Filter;
using BonsaiShop.DTO;
using BonsaiShop.DAO;
using BonsaiShop.Utility;

namespace BonsaiShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserDAO userDAO;
        public UsersController(UserDAO userDAO)
        {
            this.userDAO = userDAO;
        }

        // GET: api/Users?role=[role]&page=[page]
        [HttpGet]
        [Authorize]
        [AdministratorAuthorization]
        public IActionResult GetUsers(string role, int page)
        {
            try
            {
                var list = userDAO.GetUsers(role, page);
                return Ok(list);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("search")]
        [AdministratorAuthorization]
        public IActionResult SearchUserByKeyWord(string keyword, string page)
        {
            try
            {
                var list = userDAO.SearchUserByKeyWord(keyword, page);
                return Ok(list);
            }
            catch
            {
                return NotFound();
            }
        }


        // GET: api/Users/5

        [HttpGet("{phone}")]
        [Authorize]
        [MemberAuthorization]
        public IActionResult GetUser(string phone)
        {
            UserDTO user = userDAO.GetUser(phone);
            if (user == null)
            {
                return NotFound(new MessageResponseDTO
                {
                    statusCode = 404,
                    message = "Không tìm thấy tài khoản tương ướng với SĐT " + phone
                });
            }
            return Ok(user);
        }

        // PUT: api/Users/0943417917
        // body yêu cầu tối thiểu 2 trường SDT và password
        [HttpPut("{phone}")]
        [Authorize]
        [MemberAuthorization]
        public IActionResult PutUser(string phone, [FromBody] UserDTO user)
        {
            try
            {
                if (!userDAO.UserExists(phone))
                {
                    return NotFound(new MessageResponseDTO
                    {
                        statusCode = 404,
                        message = "Không tìm thấy tài khoản tương ướng với SĐT " + phone
                    });
                }
                else
                {
                    user.phone = phone;
                    userDAO.UpdateUser(phone,user);
                }
                return NoContent();

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new MessageResponseDTO
                {
                    statusCode = 400,
                    message = "Cập nhật thất bại, thông tin user không bị thay đổi"
                });
            }

        }

        // POST: api/Users
        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult RegisterMember([FromBody] User user)
        {
            try
            {
                if (userDAO.UserExists(user.phone))
                {
                    return BadRequest(new MessageResponseDTO
                    {
                        statusCode = 400,
                        message = "Số điện thoại này đã được đăng kí"
                    });
                }
                user.role = Config.Const.Role.MEMBER;
                userDAO.CreateUser(user);
                return CreatedAtAction("GetUser", new { id = user.userId }, user);
            }
            catch
            {
                return BadRequest(new MessageResponseDTO
                {
                    statusCode = 400,
                    message = "Hãy nhập thông tin hợp lệ"
                });
            }
        }

        // POST : /api/Users/login?rememberMe=[false]
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] User user,bool rememberMe)
        {
            string role = userDAO.login(user.phone, user.password);
            if (role != null)
            {
                return Ok(Security.GenerateJwtToken(user.phone, role, rememberMe));
            }
           return Forbid("Đăng nhập thất bại");

        }

/*        Format 
            {
    "phone" : "123",
    "password" : "123"
}*/
}
}
