using HealthMate.Repository.DTOs.Login;
using HealthMate.Repository.Interface.User;
using HealthMate.Repository.Models;
using HealthMate.Services.Interface.User;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.User
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repo;
        private readonly IJwtService _jwtService;

        public AuthService(IUserRepository repo, IJwtService jwtService)
        {
            _repo = repo;
            _jwtService = jwtService;
        }

        public async Task<LoginResponse> AuthenticateAsync(LoginRequest request)
        {
            // Get user by email first
            var user = await _repo.GetByEmailAsync(request.Email);
            if (user == null) return null;

            // Verify the password using BCrypt
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return null;
            }

            return _jwtService.GenerateToken(user);
        }

        public async Task<LoginResponse> AuthenticateGoogleAsync(string email, string fullName)
        {
            var user = await _repo.GetByEmailAsync(email);
            if (user == null)
            {
                // Create a new user for Google login
                user = await _repo.CreateGoogleUserAsync(email, fullName);
            }
            return _jwtService.GenerateToken(user);
        }

        public async Task<LoginResponse> RegisterAsync(RegisterRequest request)
        {
            if (!request.AcceptTerms)
            {
                throw new InvalidOperationException("Terms and conditions must be accepted");
            }

            // Hash the password before storing
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            try
            {
                var user = await _repo.RegisterUserAsync(
                    request.Email,
                    passwordHash,
                    request.FullName,
                    request.DateOfBirth
                );

                return _jwtService.GenerateToken(user);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException($"Registration failed: {ex.Message}");
            }
        }
    }
}
