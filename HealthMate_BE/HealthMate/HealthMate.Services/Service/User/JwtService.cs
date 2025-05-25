using HealthMate.Repository.DTOs.Login;
using HealthMate.Repository.Models;
using HealthMate.Services.Interface.User;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthMate.Services.Service.User
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _config;

        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public LoginResponse GenerateToken(Repository.Models.User user)
        {
            var jwtSection = _config.GetSection("Jwt");
            var keyBytes = Encoding.UTF8.GetBytes(jwtSection["Key"]);
            var creds = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.RoleName)
            };

            var expires = DateTime.UtcNow.AddMinutes(int.Parse(jwtSection["DurationMinutes"]));
            var token = new JwtSecurityToken(
                issuer: jwtSection["Issuer"],
                audience: jwtSection["Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new LoginResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expires = expires
            };
        }
    }
} 