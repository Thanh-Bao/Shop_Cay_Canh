﻿using BonsaiShop.DB;
using BonsaiShop.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace BonsaiShop.Filter
{
    internal class AdministratorAuthorizationAttribute : Attribute, IAuthorizationFilter
    {
        

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                var identity = context.HttpContext.User.Identity as ClaimsIdentity;
                IList<Claim> claim = identity.Claims.ToList();
                string role = claim[1].Value;

                if (!role.Equals(Config.Const.Role.ADMIN))
                {
                    context.Result = new ForbidResult("Bạn không có quyền truy cập nội dung này");
                }

            }
            catch
            {
                context.Result = new UnauthorizedObjectResult(new MessageResponse
                {
                    statusCode = 401,
                    message = "Lỗi xác định quyền truy cập, bạn không thể xem nội dung này"
                });
            }









        }
    }
}