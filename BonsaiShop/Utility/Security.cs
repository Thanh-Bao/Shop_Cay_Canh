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
        public static string HashPasword(string passwordPlaintText, string phone)
        {
            // Step 1, calculate MD5 hash from passwordPlaintText + timeCreate
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(passwordPlaintText + phone);
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            // Step 2, convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hashBytes.Length; i++)
            {
                sb.Append(hashBytes[i].ToString("X2"));
            }
            return sb.ToString();
        }

        public static string GenerateJwtToken(string name,string phone, string role, bool rememberMe)
        {
            var securiryKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(CofigJWT.SECRECTKEY));
            var credentials = new SigningCredentials(securiryKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("name",name),
                new Claim("phone",phone),
                new Claim("role",role),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };
            int minute = CofigJWT.TIMEEXPIRED;
            if (rememberMe)
            {
                minute = 999999;
            }
            var token = new JwtSecurityToken(
                issuer: CofigJWT.ISSUER,
                audience: CofigJWT.AUDIENCE,
                claims,
                expires: DateTime.UtcNow.AddMinutes(minute),
                signingCredentials: credentials
            );
            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }


       



    }
}
