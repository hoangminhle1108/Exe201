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

            string otp;
            DateTime expiry;

            // Nếu OTP hiện tại còn hiệu lực → gửi lại
            if (!string.IsNullOrEmpty(user.ResetPasswordToken) && user.ResetPasswordTokenExpiry > DateTime.UtcNow)
            {
                otp = user.ResetPasswordToken!;
                expiry = user.ResetPasswordTokenExpiry.Value;
            }
            else
            {
                otp = new Random().Next(100000, 999999).ToString();
                expiry = DateTime.UtcNow.AddMinutes(5);
                await _userRepository.SetResetPasswordTokenAsync(email, otp, expiry);
            }

            var htmlMessage = $@"
        <p>Xin chào {user.FullName ?? "User"},</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu. Đây là mã OTP của bạn:</p>
        <h2 style='color: #4CAF50; font-size: 24px; text-align: center;'>{otp}</h2>
        <p>Mã này sẽ hết hạn sau 5 phút.</p>";

            await _emailService.SendEmailAsync(user.Email, "Đặt lại mật khẩu", htmlMessage);
            return true;
        }

        public async Task<bool> VerifyOtpAsync(string email, string otp)
        {
            var user = await _userRepository.GetUserByResetTokenAsync(email, otp);
            Console.WriteLine($"OTP = {user.ResetPasswordToken}, Expiry = {user.ResetPasswordTokenExpiry}, Now = {DateTime.UtcNow}");

            return user != null;
        }

        public async Task<bool> ResetPasswordAsync(string email, string newPassword)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null || user.ResetPasswordTokenExpiry < DateTime.UtcNow)
                return false;

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);

            return await _userRepository.UpdatePasswordAsync(user.UserId, hashedPassword);
        }

        public async Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
        {
            if (userId <= 0)
                throw new ArgumentException("User ID must be a positive integer.", nameof(userId));
            if (string.IsNullOrEmpty(oldPassword))
                throw new ArgumentException("Old password cannot be null or empty.", nameof(oldPassword));
            if (string.IsNullOrEmpty(newPassword))
                throw new ArgumentException("New password cannot be null or empty.", nameof(newPassword));

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                throw new InvalidOperationException($"User with ID {userId} not found.");

            // Verify old password
            if (!BCrypt.Net.BCrypt.Verify(oldPassword, user.PasswordHash))
                return false;

            var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);

            // Call repository to update password
            return await _userRepository.ChangePasswordAsync(userId, user.PasswordHash, newPasswordHash);
        }

        public async Task<bool> SendEvalutionFormAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null) return false;
            var htmlMessage = $@"
                <p>Xin chào {user.FullName ?? "User "},</p>
                <p>Cảm ơn bạn đã đồng hành cùng HealthMate trong thời gian qua.</p>
                <p>Chúng tôi rất tiếc khi biết rằng bạn đã quyết định xóa tài khoản của mình khỏi ứng dụng. Dù tôn trọng lựa chọn của bạn, nhưng chúng tôi luôn mong muốn được lắng nghe ý kiến và trải nghiệm thực tế từ người dùng để cải thiện sản phẩm ngày một tốt hơn.</p>
                <p>Vì vậy, chúng tôi kính mời bạn dành ít phút để hoàn thành một bảng khảo sát ngắn tại đây:</p>
                <p><a href='https://forms.gle/aNQdgtr1NcLDrSmQ6'>Khảo sát</a></p>
                <p>Khảo sát này giúp chúng tôi hiểu rõ hơn về lý do bạn quyết định rời đi và làm thế nào để HealthMate có thể phục vụ người dùng tốt hơn trong tương lai.</p>
                <p>Mọi đóng góp của bạn đều rất quý báu đối với đội ngũ phát triển.</p>
                <p>Một lần nữa, xin chân thành cảm ơn bạn vì đã tin tưởng và sử dụng HealthMate.</p>
                <p>Chúc bạn thật nhiều sức khỏe và thành công!</p>
                <p>Trân trọng,<br>Đội ngũ HealthMate</p>";
            await _emailService.SendEmailAsync(user.Email, "HealthMate – Chúng tôi trân trọng ý kiến đóng góp từ bạn", htmlMessage);
            return true;
        }
    }
}
