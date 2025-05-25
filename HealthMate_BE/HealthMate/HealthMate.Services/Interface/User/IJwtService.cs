using HealthMate.Repository.DTOs.Login;
using HealthMate.Repository.Models;

namespace HealthMate.Services.Interface.User
{
    public interface IJwtService
    {
        LoginResponse GenerateToken(Repository.Models.User user);
    }
} 