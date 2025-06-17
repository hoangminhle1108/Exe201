using HealthMate.Repository.Base;
using HealthMate.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.Interface.User
{
    public interface IUserRepository 
    {
        Task<HealthMate.Repository.Models.User> GetByIdAsync(int userId);
        Task<HealthMate.Repository.Models.User> GetByEmailAndPasswordAsync(string email, string password);
        Task<HealthMate.Repository.Models.User> GetByEmailAsync(string email); 
        Task<HealthMate.Repository.Models.User> CreateGoogleUserAsync(string email, string fullName); 
        Task<List<HealthMate.Repository.Models.User>> GetAllUsersAsync();
        Task<HealthMate.Repository.Models.User> RegisterUserAsync(string email, string passwordHash, string fullName, DateOnly dateOfBirth);
        Task<List<HealthMate.Repository.Models.User>> GetAllUsersWithRoleAsync(int roleId);
        Task<List<HealthMate.Repository.Models.User>?> GetAllUsersWithNameAsync(string fullName);
        Task<List<HealthMate.Repository.Models.User>?> GetAllUserByEmailAsync(string email);
        Task<List<HealthMate.Repository.Models.User>?> GetAllUsersByGoogleAsync(bool isGoogle);
        Task<HealthMate.Repository.Models.User> UpdateUserAsync(HealthMate.Repository.Models.User user);
        Task<bool> DeleteUserAsync(int userId);
        Task SetResetPasswordTokenAsync(string email, string token, DateTime expiry);
        Task<Models.User?> GetUserByResetTokenAsync(string token);
        Task<bool> UpdatePasswordAsync(int userId, string newPasswordHash);

    }
}
