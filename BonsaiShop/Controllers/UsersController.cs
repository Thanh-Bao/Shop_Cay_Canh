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
        private readonly ApplicationDbContext context;
        public UsersController(ApplicationDbContext context)
        {
            this.context = context;
        }



        // GET: api/Users?role=[role]&page=[page]
        [HttpGet]
        [AdministratorAuthorization]
        public IActionResult GetUsers(string role, string page)
        {
            try
            {
                var list = new UserDAO(context).GetUsers(role, page);               
                return Ok(list);
            }
            catch
            {
                return BadRequest();
            }
        }

       /* [HttpGet]
        [Route("search")]
        [AdministratorAuthorization]
        public ActionResult<IEnumerable<UserDTO>> SearchUserByKeyWord(string keyword, string page)
        {
            try
            {
       
                int _page = 1;

                if (page != null)
                {
                    _page = Int32.Parse(page);
                }

                //Bỏ N phần tử đầu tiên
                int Nskip = (_page - 1) * Config.Const.PAGE_SIZE;

                var list = _context.Users
                    .Where(s => (s.numberPhone.Contains(keyword)
                               ||s.address.Contains(keyword)
                               ||s.name.Contains(keyword)
                              )&&s.role.Equals(Config.Const.Role.MEMBER)
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
            catch
            {
                return BadRequest();
            }
        }


        // GET: api/Users/5
        [HttpGet("{phone}")]
        [MemberAuthorization]
        public async Task<ActionResult<User>> GetUser(int phone)
        {
            var user = await _context.Users.FindAsync(phone);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // PUT: api/Users/5
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
        }*/

    }
}
