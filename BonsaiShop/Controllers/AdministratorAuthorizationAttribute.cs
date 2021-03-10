using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;

namespace BonsaiShop.Controllers
{
    internal class AdministratorAuthorizationAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var identity = context.HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var phoneNumber = claim[0].Value;

            context.Result = new OkObjectResult("fdfs"+phoneNumber);

            
        }
    }
}