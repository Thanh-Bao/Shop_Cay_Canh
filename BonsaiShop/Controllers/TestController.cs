using BonsaiShop.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BonsaiShop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public int fsdsdf()
        {
            return 6667;
        }

        [HttpGet]
        public string fsdsdf123()
        {
            return JWT.GenerateJwtToken("0943417917");
        }

    }
}
