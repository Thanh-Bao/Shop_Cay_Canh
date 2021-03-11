using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BonsaiShop.DB;
using BonsaiShop.Model;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BonsaiShop.Filter;
using BonsaiShop.DTO;
using BonsaiShop.DAO;

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
        [AdministratorAuthorization]
        public IActionResult GetUsers(string role, string page)
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
        [MemberAuthorization]
        public IActionResult GetUser(string phone)
        {
            UserDTO user = userDAO.GetUser(phone);
            if (user == null)
            {
                return NotFound(new MessageResponse
                {
                    statusCode = 404,
                    message = "Không tìm thấy tài khoản tương ướng với SĐT " + phone
                });
            }
            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut("{phone}")]
        public IActionResult PutUser(string phone, [FromBody] UserDTO user)
        {
            try
            {
                if (!userDAO.UserExists(phone))
                {
                    return NotFound(new MessageResponse
                    {
                        statusCode = 404,
                        message = "Không tìm thấy tài khoản tương ướng với SĐT "+phone
                    });
                } else
                {
                    userDAO.UpdateUser(phone, user);
                }
                return NoContent();

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new MessageResponse { 
                    statusCode = 400, 
                    message="Cập nhật thất bại, thông tin user không bị thay đổi"});
            }

        }

        /*// POST: api/Users
        [HttpPost]
        public  IActionResult PostUser(User user)
        {
            context.Users.Add(user);
             context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.userId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async IActionResult DeleteUser(int id)
        {
            var user =  context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            context.Users.Remove(user);
             context.SaveChangesAsync();

            return NoContent();
        }*/



    }
}
