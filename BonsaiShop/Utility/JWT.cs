using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BonsaiShop.Utility
{
    public class JWT
    {
        private static IConfiguration _config;
        public static string GenerateJwtToken(string numberPhone)
        {
            var securiryKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("fsdfsdfsdfsfsdf52352323423423"));
            var credentials = new SigningCredentials(securiryKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email,numberPhone)
                // Thêm thông tin nếu cần
            };

            var token = new JwtSecurityToken(
                issuer: "fsfsdfd",
                audience: "fffadas",
                claims,
                expires: DateTime.UtcNow.AddMinutes(1)     
                );
            

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }
    }

}
