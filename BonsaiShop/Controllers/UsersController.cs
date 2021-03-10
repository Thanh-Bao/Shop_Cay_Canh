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

namespace BonsaiShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/Users
        [HttpGet]
        [AdministratorAuthorization]
        public ActionResult<IEnumerable<UserDTO>> GetMemberUsers(string role)
        {
            string _role = "";
            switch (role)
            {
                case Config.Const.Role.MEMBER:
                    _role = Config.Const.Role.MEMBER;
                    break;
                case Config.Const.Role.ADMIN:
                    _role = Config.Const.Role.ADMIN;
                    break;
                default:
                    return NotFound();

            }
            var list = _context.Users
                .Where(s => s.role.Equals(_role)).
                Select(s => new UserDTO
                {
                    numberPhone = s.numberPhone,
                    name = s.name,
                    address = s.address
                })
                .ToList();
            return list;
        }




        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.userId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.userId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.userId == id);
        }



        public string getPhoneNumber()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var phoneNumber = claim[0].Value;
            return phoneNumber;
        }

        public string getRoleFromPhone(string phoneNumber)
        {
            var roles = _context.Users.Where(s => s.numberPhone.Equals(phoneNumber)).Select(s => s.role);

            return roles.FirstOrDefault();
        }

    }
}
