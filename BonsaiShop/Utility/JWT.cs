using BonsaiShop.Config;
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

        public static string GenerateJwtToken(string numberPhone, bool rememberMe)
        {
            var securiryKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(CofigJWT.serectKey));
            var credentials = new SigningCredentials(securiryKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email,numberPhone),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: CofigJWT.Issuer,
                audience: CofigJWT.audience,
                claims,
                expires: DateTime.UtcNow.AddMinutes(rememberMe ? 9999999 : CofigJWT.timeExpired),
                signingCredentials: credentials
            );
            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }
    }

}
