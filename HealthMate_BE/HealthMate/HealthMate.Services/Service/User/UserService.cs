using HealthMate.Repository.DTOs.UserDTO;
using HealthMate.Repository.Interface.User;
using HealthMate.Repository.Models;
using HealthMate.Services.Interface.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IEmailService _emailService;
        public UserService(IUserRepository userRepository, IEmailService emailService)
        {
            _userRepository = userRepository;
            _emailService = emailService;
        }
        public async Task<bool> DeleteUserAsync(int userId)
        {
            try
            {
                return await _userRepository.DeleteUserAsync(userId);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to delete user with ID {userId}: {ex.Message}", ex);
            }
        }

        public async Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersAsync()
        {
            List<Repository.Models.User> users = await _userRepository.GetAllUsersAsync();
            List<Repository.DTOs.UserDTO.UserDTO> userDTOs = users.Select(u => new Repository.DTOs.UserDTO.UserDTO
            {
                UserId = u.UserId,
                FullName = u.FullName,
                Email = u.Email,
                AvatarUrl = u.AvatarUrl,
                DateOfBirth = u.DateOfBirth,
                RoleId = u.RoleId,
                IsActive = u.IsActive,
                PremiumExpiry = u.PremiumExpiry
            }).ToList();
            return userDTOs;
        }

        public async Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersByEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Email cannot be null or empty.", nameof(email));
            }
            List<Repository.Models.User> users = await _userRepository.GetAllUserByEmailAsync(email);
            if (users == null || !users.Any())
            {
                throw new InvalidOperationException($"No users found with email {email}.");
            }
            List<Repository.DTOs.UserDTO.UserDTO> userDTOs = users.Select(u => new Repository.DTOs.UserDTO.UserDTO
            {
                UserId = u.UserId,
                FullName = u.FullName,
                Email = u.Email,
                AvatarUrl = u.AvatarUrl,
                DateOfBirth = u.DateOfBirth,
                RoleId = u.RoleId,
                IsActive = u.IsActive,
                PremiumExpiry = u.PremiumExpiry
            }).ToList();
            return userDTOs;
        }

        public async Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersByGoogleAsync(bool isGoogle)
        {
            List<Repository.Models.User> users = await _userRepository.GetAllUsersByGoogleAsync(isGoogle);
            if (users == null || !users.Any())
            {
                throw new InvalidOperationException($"No users found with Google account status {isGoogle}.");
            }
            List<Repository.DTOs.UserDTO.UserDTO> userDTOs = users.Select(u => new Repository.DTOs.UserDTO.UserDTO
            {
                UserId = u.UserId,
                FullName = u.FullName,
                Email = u.Email,
                AvatarUrl = u.AvatarUrl,
                DateOfBirth = u.DateOfBirth,
                RoleId = u.RoleId,
                IsActive = u.IsActive,
                PremiumExpiry = u.PremiumExpiry
            }).ToList();
            return userDTOs;
        }

        public async Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersWithNameAsync(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
            {
                throw new ArgumentException("Full name cannot be null or empty.", nameof(fullName));
            }
            List<Repository.Models.User> users = await _userRepository.GetAllUsersWithNameAsync(fullName);
            if (users == null || !users.Any())
            {
                throw new InvalidOperationException($"No users found with full name {fullName}.");
            }
            List<Repository.DTOs.UserDTO.UserDTO> userDTOs = users.Select(u => new Repository.DTOs.UserDTO.UserDTO
            {
                UserId = u.UserId,
                FullName = u.FullName,
                Email = u.Email,
                AvatarUrl = u.AvatarUrl,
                DateOfBirth = u.DateOfBirth,
                RoleId = u.RoleId,
                IsActive = u.IsActive,
                PremiumExpiry = u.PremiumExpiry
            }).ToList();
            return userDTOs;
        }

        public async Task<List<Repository.DTOs.UserDTO.UserDTO>> GetAllUsersWithRoleAsync(int roleId)
        {
            if (roleId <= 0)
            {
                throw new ArgumentException("Role ID must be between 1 and 3.", nameof(roleId));
            }
            List<Repository.Models.User> users = await _userRepository.GetAllUsersWithRoleAsync(roleId);
            List<Repository.DTOs.UserDTO.UserDTO> userDTOs = users.Select(u => new Repository.DTOs.UserDTO.UserDTO
            {
                UserId = u.UserId,
                FullName = u.FullName,
                Email = u.Email,
                AvatarUrl = u.AvatarUrl,
                DateOfBirth = u.DateOfBirth,
                RoleId = u.RoleId,
                IsActive = u.IsActive,
                PremiumExpiry = u.PremiumExpiry
            }).ToList();
            return userDTOs;
        }

        public async Task<Repository.Models.User> GetUserByEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Email cannot be null or empty.", nameof(email));
            }
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
            {
                throw new InvalidOperationException($"User with email {email} not found.");
            }
            return user;
        }

        public async Task<Repository.Models.User> GetUserByIdAsync(int userId)
        {
            if (userId is <= 0 )
            {
                throw new ArgumentException("User ID must be a positive integer.", nameof(userId));
            }
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException($"User with ID {userId} not found.");
            }
            return user;
        }

        public async Task<Repository.DTOs.UserDTO.UserDTO> UpdateUserAsync(UserUpdateDTO updatedUser)
        {
            var existingUser = await _userRepository.GetByIdAsync(updatedUser.UserId);
            if (existingUser == null)
            {
                throw new InvalidOperationException($"User with ID {updatedUser.UserId} not found.");
            }
            if (string.IsNullOrEmpty(updatedUser.FullName))
            {
                throw new ArgumentException("Full Name cannot be null or empty.");
            }
            if (string.IsNullOrEmpty(updatedUser.PasswordHash)) throw new ArgumentException("Password Hash cannot be null or empty.", nameof(updatedUser.PasswordHash));
            if (updatedUser.RoleId <= 0 || updatedUser.RoleId > 3)
            {
                throw new ArgumentException("Role ID must be between 1 and 3.", nameof(updatedUser.RoleId));
            }
            existingUser.FullName = updatedUser.FullName;
            existingUser.PasswordHash = updatedUser.PasswordHash;
            existingUser.AvatarUrl = updatedUser.AvatarUrl;
            existingUser.DateOfBirth = updatedUser.DateOfBirth;
            existingUser.RoleId = updatedUser.RoleId;
            existingUser.PremiumExpiry = updatedUser.PremiumExpiry;
            existingUser.IsActive = updatedUser.IsActive;
            existingUser.UpdatedAt = DateTime.UtcNow;
            try
            {
                Repository.Models.User user = await _userRepository.UpdateUserAsync(existingUser);
                return new Repository.DTOs.UserDTO.UserDTO
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    AvatarUrl = user.AvatarUrl,
                    DateOfBirth = user.DateOfBirth,
                    RoleId = user.RoleId,
                    IsActive = user.IsActive,
                    PremiumExpiry = user.PremiumExpiry
                };
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to update user with ID {updatedUser.UserId}: {ex.Message}", ex);
            }
        }

        public async Task<Repository.DTOs.UserDTO.UserDTO> UpdateUserStatusAsync(int userId, bool isActive)
        {
            if (userId <= 0)
            {
                throw new ArgumentException("User ID must be a positive integer.", nameof(userId));
            }

            var existingUser = await _userRepository.GetByIdAsync(userId);
            if (existingUser == null)
            {
                throw new InvalidOperationException($"User with ID {userId} not found.");
            }

            existingUser.IsActive = isActive;
            existingUser.UpdatedAt = DateTime.UtcNow;

            try
            {
                Repository.Models.User user = await _userRepository.UpdateUserAsync(existingUser);
                return new Repository.DTOs.UserDTO.UserDTO
                {
                    UserId = user.UserId,
                    FullName = user.FullName,
                    Email = user.Email,
                    AvatarUrl = user.AvatarUrl,
                    DateOfBirth = user.DateOfBirth,
                    RoleId = user.RoleId,
                    IsActive = user.IsActive,
                    PremiumExpiry = user.PremiumExpiry
                };
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to update user status with ID {userId}: {ex.Message}", ex);
            }
        }
        public async Task<bool> RequestPasswordResetAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null) return false;

            var token = Guid.NewGuid().ToString();
            var expiry = DateTime.UtcNow.AddMinutes(15);

            await _userRepository.SetResetPasswordTokenAsync(email, token, expiry);

            var resetUrl = $"https://yourfrontend.com/reset-password?token={token}";
            var htmlMessage = $@"
        <p>Hello {user.FullName ?? "User"},</p>
        <p>You requested a password reset. Click below:</p>
        <p><a href='{resetUrl}'>Reset Password</a></p>
        <p>This link will expire in 15 minutes.</p>";

            await _emailService.SendEmailAsync(user.Email, "Reset Your Password", htmlMessage);
            return true;
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            var user = await _userRepository.GetUserByResetTokenAsync(token);
            if (user == null) return false;

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);
            return await _userRepository.UpdatePasswordAsync(user.UserId, hashedPassword);
        }
    }
}
