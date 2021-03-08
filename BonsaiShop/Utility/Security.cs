using System.Security.Cryptography;
using System.Text;

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
    }
}
