using System.Security.Cryptography;
using System.Text;
using BonsaiShop.Config;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BonsaiShop.Model;

namespace BonsaiShop.Utility
{
    public class Security
    {
        public static string HashPasword(string passwordPlaintText, int timeCreate)
        {
            // Step 1, calculate MD5 hash from passwordPlaintText + timeCreate
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(passwordPlaintText + timeCreate);
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            // Step 2, convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hashBytes.Length; i++)
            {
                sb.Append(hashBytes[i].ToString("X2"));
            }
            return sb.ToString();
        }

        public static string GenerateJwtToken(User user, bool rememberMe)
        {
            var securiryKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(CofigJWT.SECRECTKEY));
            var credentials = new SigningCredentials(securiryKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email,user.numberPhone),
                new Claim("role",user.role),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: CofigJWT.ISSUER,
                audience: CofigJWT.AUDIENCE,
                claims,
                expires: DateTime.UtcNow.AddMinutes(rememberMe ? 9999999 : CofigJWT.TIMEEXPIRED),
                signingCredentials: credentials
            );
            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }


       



    }
}
