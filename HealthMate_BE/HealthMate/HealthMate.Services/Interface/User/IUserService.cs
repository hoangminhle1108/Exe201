using HealthMate.Repository.DTOs.UserDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.User
{
    public interface IUserService
    {
        Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersAsync();
        Task<Repository.Models.User> GetUserByIdAsync(int userId);
        Task<Repository.Models.User> GetUserByEmailAsync(string email);
        Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersByEmailAsync(string email);
        Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersByGoogleAsync(bool isGoogle);
        Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersWithRoleAsync(int roleId);
        Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersWithNameAsync(string fullName);
        Task<Repository.DTOs.UserDTO.UserDTO> UpdateUserAsync(UserUpdateDTO updatedUser);
        Task<bool> DeleteUserAsync(int userId);
        Task<Repository.DTOs.UserDTO.UserDTO> UpdateUserStatusAsync(int userId, bool isActive);
        Task<bool> RequestPasswordResetAsync(string email);
        Task<bool> ResetPasswordAsync(string token, string newPassword);

    }
}
