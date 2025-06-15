using HealthMate.Repository.Base;
using HealthMate.Repository.Interface.User;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace HealthMate.Repository.Repository.User
{
    public class UserRepository : IUserRepository
    {
        private readonly NutritionAppContext _ctx;
        public UserRepository(NutritionAppContext ctx) => _ctx = ctx;

        public async Task<Models.User> CreateGoogleUserAsync(string email, string fullName)
        {
            // Check if user already exists
            var existingUser = await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (existingUser != null)
            {
                // If user exists but is not a Google user, update it
                if (!existingUser.IsGoogle)
                {
                    existingUser.IsGoogle = true;
                    existingUser.FullName = fullName ?? existingUser.FullName;
                    existingUser.UpdatedAt = DateTime.UtcNow;
                    await _ctx.SaveChangesAsync();
                }
                return existingUser;
            }

            // Get the Free role
            var defaultRole = await _ctx.Roles.FirstOrDefaultAsync(r => r.RoleName == "Free");
            if (defaultRole == null)
            {
                throw new InvalidOperationException("Default role 'Free' not found in the database.");
            }

            var user = new Models.User
            {
                Email = email,
                FullName = fullName,
                IsGoogle = true,
                RoleId = defaultRole.RoleId,  // Use the RoleId from the database
                TermsAcceptedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                IsActive = true,
                // Set a random password hash for Google users (they won't use it)
                PasswordHash = Guid.NewGuid().ToString()
            };

            try
            {
                _ctx.Users.Add(user);
                await _ctx.SaveChangesAsync();
                
                // Reload the user with role information
                return await _ctx.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.UserId == user.UserId);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to create Google user: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }
            try
            {
                _ctx.Users.Remove(user);
                await _ctx.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to delete user ({user.UserId}, {user.FullName}): {ex.Message}", ex);
            }
        }

        public async Task<List<Models.User>?> GetAllUserByEmailAsync(string email)
        {
            List<Models.User>? users = await _ctx.Users
                .Where(u => u.Email.Contains(email))
                .Include(u => u.Role)
                .ToListAsync();
            if (users == null || users.Count == 0)
            {
                return null;
            }
            return users;
        }

        public async Task<List<Models.User>> GetAllUsersAsync()
        {
            return await _ctx.Users
                .Include(u => u.Role)
                .ToListAsync();
        }

        public async Task<List<Models.User>?> GetAllUsersByGoogleAsync(bool isGoogle)
        {
            List<Models.User>? users = await _ctx.Users
                .Where(u => u.IsGoogle == isGoogle)
                .Include(u => u.Role)
                .ToListAsync();
            if (users == null || users.Count == 0) return null;
            return users;
        }

        public async Task<List<Models.User>?> GetAllUsersWithNameAsync(string fullName)
        {
            List<Models.User>? users = await _ctx.Users
                .Where(u => u.FullName.Contains(fullName))
                .Include(u => u.Role)
                .ToListAsync();
            if (users == null || users.Count == 0) return null;
            return users;
        }

        public async Task<List<Models.User>> GetAllUsersWithRoleAsync(int roleId)
        {
            List<Models.User>? users = await _ctx.Users
                .Where(u => u.RoleId == roleId)
                .Include(u => u.Role)
                .ToListAsync();
            if (users == null || users.Count == 0) return null;
            return users;
        }

        public async Task<Models.User> GetByEmailAndPasswordAsync(string? email, string? passwordHash)
        {
            var user = await _ctx.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null) return null;

            // Verify password hash
            if (!BCrypt.Net.BCrypt.Verify(passwordHash, user.PasswordHash))
            {
                return null;
            }

            return user;
        }

        public async Task<Models.User?> GetByEmailAsync(string email)
        {
            return await _ctx.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Models.User?> GetByIdAsync(int userId)
        {
            return await _ctx.Users
                .Include(u => u.Role)
                .Include(u => u.HealthMetrics)
                .FirstOrDefaultAsync(u => u.UserId == userId);
        }

        public async Task<Models.User> RegisterUserAsync(string email, string passwordHash, string fullName, DateOnly dateOfBirth)
        {
            // Check if user already exists
            var existingUser = await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User with this email already exists");
            }

            // Get the Free role
            var defaultRole = await _ctx.Roles.FirstOrDefaultAsync(r => r.RoleName == "Free");
            if (defaultRole == null)
            {
                throw new InvalidOperationException("Default role 'Free' not found in the database.");
            }

            var user = new Models.User
            {
                Email = email,
                PasswordHash = passwordHash,
                FullName = fullName,
                DateOfBirth = dateOfBirth,
                IsGoogle = false,
                RoleId = defaultRole.RoleId,  // Use the RoleId from the database
                TermsAcceptedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            try
            {
                _ctx.Users.Add(user);
                await _ctx.SaveChangesAsync();
                
                // Reload the user with role information
                return await _ctx.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.UserId == user.UserId);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to register user: {ex.Message}", ex);
            }
        }

        public async Task<Models.User> UpdateUserAsync(Models.User user)
        {
            var existingUser = await _ctx.Users.FirstOrDefaultAsync(u => u.UserId == user.UserId);
            if (existingUser == null)
            {
                throw new InvalidOperationException("User not found");
            }
            try
            {
                existingUser.Email = user.Email;
                existingUser.FullName = user.FullName;
                existingUser.AvatarUrl = user.AvatarUrl;
                existingUser.DateOfBirth = user.DateOfBirth;
                existingUser.IsGoogle = user.IsGoogle;
                existingUser.RoleId = user.RoleId;
                existingUser.TermsAcceptedAt = user.TermsAcceptedAt;
                existingUser.PremiumExpiry = user.PremiumExpiry;
                existingUser.IsActive = user.IsActive;
                existingUser.UpdatedAt = DateTime.UtcNow;
                _ctx.Users.Update(existingUser);
                _ctx.SaveChanges();
                
                return await _ctx.Users
                    .Include(u => u.Role)
                    .FirstOrDefaultAsync(u => u.UserId == existingUser.UserId);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to update user ({user.UserId}, {user.FullName}): {ex.Message}", ex);
            }
        }
        public async Task SetResetPasswordTokenAsync(string email, string token, DateTime expiry)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) throw new InvalidOperationException("User not found.");

            user.ResetPasswordToken = token;
            user.ResetPasswordTokenExpiry = expiry;
            user.UpdatedAt = DateTime.UtcNow;

            await _ctx.SaveChangesAsync();
        }

        public async Task<Models.User?> GetUserByResetTokenAsync(string token)
        {
            return await _ctx.Users.FirstOrDefaultAsync(u =>
                u.ResetPasswordToken == token && u.ResetPasswordTokenExpiry > DateTime.UtcNow);
        }

        public async Task<bool> UpdatePasswordAsync(int userId, string newPasswordHash)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null) return false;

            user.PasswordHash = newPasswordHash;
            user.ResetPasswordToken = null;
            user.ResetPasswordTokenExpiry = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _ctx.SaveChangesAsync();
            return true;
        }
    }
}
