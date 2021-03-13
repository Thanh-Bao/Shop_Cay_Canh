using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BonsaiShop.DTO;

namespace BonsaiShop.Filter
{
    // Mỗi member chỉ được request đến dữ liệu của member đó
    // So sánh SĐT member đó cần tìm trong parameter và SĐT trong payload token
    public class MemberAuthorizationAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                var identity = context.HttpContext.User.Identity as ClaimsIdentity;
                IList<Claim> claim = identity.Claims.ToList();
                string phonePayload = claim[0].Value;
                string role = claim[1].Value;
                string URL = context.HttpContext.Request.Path;
                string phoneQuery = URL.Split('/').Last();
                if (!phonePayload.Equals(phoneQuery)&&!role.Equals(Config.Const.Role.ADMIN))
                {
                    context.Result = new StatusCodeResult(403);
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
