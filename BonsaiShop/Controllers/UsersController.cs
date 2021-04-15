using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BonsaiShop.Model;
using Microsoft.AspNetCore.Authorization;
using BonsaiShop.Filter;
using BonsaiShop.DTO;
using BonsaiShop.DAO;
using BonsaiShop.Utility;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System;

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
                    userDAO.UpdateUser(phone, user);
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
                user.name = " ";
                user.address = " ";
                user.password = Security.HashPasword(user.password, user.phone);
                user.timestamp = (Int32)DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                userDAO.CreateUser(user);
                return CreatedAtAction("GetUser", new { id = user.phone }, user);
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

        // POST: api/Users
        [HttpPost]
        [Route("check-exist")]
        [AllowAnonymous]
        public IActionResult CheckExist([FromBody] User user)
        {
            try
            {
                if (userDAO.UserExists(user.phone))
                {
                    return Ok(true);
                } else
                {
                    return Ok(false);
                }
               
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
        public IActionResult Login([FromBody] User user, bool rememberLogin)
        {
            string role = userDAO.login(user.phone, user.password);
            try
            {
                if (role != null)
                {
                    UserDTO u = userDAO.GetUser(user.phone);
                    var token = Security.GenerateJwtToken(u.name, user.phone, role, rememberLogin);
                    var handler = new JwtSecurityTokenHandler();
                    var jsonToken = handler.ReadToken(token);
                    var tokenS = jsonToken as JwtSecurityToken;
                    string role_payload = tokenS.Claims.First(claim => claim.Type == "role").Value;
                    string phone_payload = tokenS.Claims.First(claim => claim.Type == "phone").Value;
                    string name_payload = tokenS.Claims.First(claim => claim.Type == "name").Value;

                    var result = new
                    {
                        role = role_payload,
                        phone = phone_payload,
                        name = name_payload,
                        token = token
                    };

                    return Ok(result);
                }
            }
            catch
            {
                return Forbid("Đăng nhập thất bại");
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
