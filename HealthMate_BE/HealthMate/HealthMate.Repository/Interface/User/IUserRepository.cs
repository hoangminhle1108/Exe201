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
        Task<HealthMate.Repository.Models.User> GetByEmailAndPasswordAsync(string email, string password);
        Task<HealthMate.Repository.Models.User> GetByEmailAsync(string email); 
        Task<HealthMate.Repository.Models.User> CreateGoogleUserAsync(string email, string fullName); 
        Task<List<HealthMate.Repository.Models.User>> GetAllUsersAsync();
        Task<HealthMate.Repository.Models.User> RegisterUserAsync(string email, string passwordHash, string fullName, DateOnly dateOfBirth);
    }
}
