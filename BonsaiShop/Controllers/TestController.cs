using BonsaiShop.DB;
using BonsaiShop.Filter;
using BonsaiShop.Model;
using BonsaiShop.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BonsaiShop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        
        [HttpPost]
        public string fsdsdf()
        {
            return getPhoneNumber();
        }


        [AdministratorAuthorization]

        [HttpGet]
        [Route("xxx")]
        public string sdnsosonfifsofnofn()
        {
            return "ahihi do ngoc";
        }


        [HttpGet]
        public string fsdsdf123()
        {
            return Security.GenerateJwtToken(new User { numberPhone="095434323", role="Admin"}, false);
        }

         public string getPhoneNumber()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var phoneNumber = claim[0].Value;
            return phoneNumber;
        }

    }


   

}
