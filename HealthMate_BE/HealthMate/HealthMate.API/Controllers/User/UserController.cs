using HealthMate.Repository.DTOs.UserDTO;
using HealthMate.Services.Interface.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace HealthMate.API.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) => _userService = userService;

        [HttpGet("all_users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("all_user_by_email/{email}")]
        public async Task<IActionResult> GetAllUsersByEmail(string email)
        {
            try
            {
                var users = await _userService.GetAllUsersByEmailAsync(email);
                return Ok(users);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("all_users_with_name/{fullName}")]
        public async Task<IActionResult> GetAllUsersWithName(string fullName)
        {
            try
            {
                var users = await _userService.GetAllUsersWithNameAsync(fullName);
                return Ok(users);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("all_users_by_google/{isGoogle}")]
        public async Task<IActionResult> GetAllUsersByGoogle(bool isGoogle)
        {
            try
            {
                var users = await _userService.GetAllUsersByGoogleAsync(isGoogle);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }        

        [HttpGet("all_users_with_role/{roleId}")]
        public async Task<IActionResult> GetAllUsersWithRole(int roleId)
        {
            try
            {
                var users = await _userService.GetAllUsersWithRoleAsync(roleId);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPut("update_user")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDTO updatedUser)
        {
            if (updatedUser == null)
            {
                return BadRequest(new { message = "Invalid user data" });
            }
            try
            {
                var user = await _userService.UpdateUserAsync(updatedUser);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpDelete("delete_user/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            try
            {
                var result = await _userService.DeleteUserAsync(userId);
                if (result)
                {
                    return Ok(new { message = "User deleted successfully" });
                }
                return NotFound(new { message = "User not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPut("update_user_status/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserStatus(int userId, [FromBody] bool isActive)
        {
            try
            {
                var user = await _userService.UpdateUserStatusAsync(userId, isActive);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpPost("request-reset-password")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] string email)
        {
            var success = await _userService.RequestPasswordResetAsync(email);
            if (!success) return NotFound(new { message = "Không tìm thấy người dùng." });

            return Ok(new { message = "Mã OTP đã được gửi đến email của bạn." });
        }
        [HttpPost("send-eval-form")]
        public async Task<IActionResult> SendEvalForm([FromBody] string email)
        {
            var success = await _userService.SendEvalutionFormAsync(email);
            if (!success) return NotFound(new { message = "Không tìm thấy người dùng." });
            return Ok(new { message = "Đánh giá đã được gửi đến email của khách hàng" });
        }

        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOTP([FromBody] string email)
        {
            var success = await _userService.RequestPasswordResetAsync(email);
            if (!success) return NotFound(new { message = "Không tìm thấy người dùng." });

            return Ok(new { message = "Mã OTP mới đã được gửi đến email của bạn." });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOTP([FromBody] VerifyOTPDTO dto)
        {
            var success = await _userService.VerifyOtpAsync(dto.Email, dto.OTP);
            if (!success) return BadRequest(new { message = "Mã OTP không hợp lệ hoặc đã hết hạn." });

            return Ok(new { message = "Mã OTP hợp lệ." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO dto)
        {
            var success = await _userService.ResetPasswordAsync(dto.Email, dto.NewPassword);
            if (!success) return BadRequest(new { message = "Không thể đổi mật khẩu. Vui lòng thử lại." });

            return Ok(new { message = "Mật khẩu đã được cập nhật thành công." });
        }
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.OldPassword) || string.IsNullOrEmpty(dto.NewPassword))
            {
                return BadRequest(new { message = "Thông tin không hợp lệ." });
            }
            try
            {
                var user = await _userService.GetUserByEmailAsync(dto.Email);
                if (user == null)
                {
                    return NotFound(new { message = "Người dùng không tồn tại." });
                }
                var success = await _userService.ChangePasswordAsync(user.Email, dto.OldPassword, dto.NewPassword);
                if (!success)
                {
                    return BadRequest(new { message = "Mật khẩu cũ không đúng." });
                }
                return Ok(new { message = "Mật khẩu đã được thay đổi thành công." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDTO dto)
        {
            var success = await _userService.UpdateProfileAsync(dto);
            if (!success)
                return NotFound(new { message = "User not found" });

            return Ok(new { message = "Profile updated successfully" });
        }
    }
}
