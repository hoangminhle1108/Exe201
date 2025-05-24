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
        public async Task<Models.User> GetByEmailAndPasswordAsync(string? email, string? password)
        {
            return await _ctx.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == password);
        }
    }
}
