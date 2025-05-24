using HealthMate.Repository.DTOs.Login;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.User
{
    public interface IAuthService
    {
        Task<LoginResponse> AuthenticateAsync(LoginRequest request);
        Task<LoginResponse> AuthenticateGoogleAsync(string email, string fullName);
    }
}
