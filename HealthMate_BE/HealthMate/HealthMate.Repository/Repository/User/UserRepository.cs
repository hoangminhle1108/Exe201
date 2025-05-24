using HealthMate.Repository.Base;
using HealthMate.Repository.Interface.User;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.Repository.User
{
    public class UserRepository : IUserRepository
    {
        private readonly NutritionAppContext _ctx;
        public UserRepository(NutritionAppContext ctx) => _ctx = ctx;

        public Task<Models.User> CreateGoogleUserAsync(string email, string fullName)
        {
            var defaultRole = _ctx.Roles.FirstOrDefault(r => r.RoleName == "Free");
            if (defaultRole == null)
            {
                throw new InvalidOperationException("Default role 'Free' not found in the database.");
            }
            var user = new Models.User
            {
                Email = email,
                FullName = fullName,
                IsGoogle = true,
                RoleId = 1,
                Role = defaultRole,
                TermsAcceptedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };
            _ctx.Users.Add(user);
            return _ctx.SaveChangesAsync().ContinueWith(t => user);
        }

        public async Task<List<Models.User>> GetAllUsersAsync()
        {
            return await _ctx.Users
                .Include(u => u.Role)
                .ToListAsync();
        }

        public async Task<Models.User> GetByEmailAndPasswordAsync(string? email, string? password)
        {
            return await _ctx.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == password);
        }

        public async Task<Models.User> GetByEmailAsync(string email)
        {
            return await _ctx.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
