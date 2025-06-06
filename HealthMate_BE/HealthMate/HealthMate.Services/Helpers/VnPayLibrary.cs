using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Services.Helpers
{
    public class VnPayLibrary
    {
        private readonly SortedList<string, string> requestData = new SortedList<string, string>();

        public void AddRequestData(string key, string value)
        {
            requestData.Add(key, value);
        }

        public string CreateRequestUrl(string baseUrl, string hashSecret)
        {
            StringBuilder data = new StringBuilder();
            foreach (var kv in requestData)
            {
                data.AppendFormat("{0}={1}&", WebUtility.UrlEncode(kv.Key), WebUtility.UrlEncode(kv.Value));
            }

            string rawData = string.Join("&", requestData.Select(x => x.Key + "=" + x.Value));
            string secureHash = HmacSHA512(hashSecret, rawData);
            return baseUrl + "?" + data.ToString() + "vnp_SecureHash=" + secureHash;
        }

        private string HmacSHA512(string key, string inputData)
        {
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var inputBytes = Encoding.UTF8.GetBytes(inputData);
            using (var hmac = new HMACSHA512(keyBytes))
            {
                var hashBytes = hmac.ComputeHash(inputBytes);
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }

        public bool ValidateSignature(string hashSecret)
        {
            string vnp_SecureHash = requestData["vnp_SecureHash"];
            requestData.Remove("vnp_SecureHash");

            string rawData = string.Join("&", requestData.Select(x => x.Key + "=" + x.Value));
            string myHash = HmacSHA512(hashSecret, rawData);

            return vnp_SecureHash == myHash;
        }
    }
}
