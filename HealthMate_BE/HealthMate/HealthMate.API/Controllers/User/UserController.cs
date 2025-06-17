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
            if (!success) return NotFound(new { message = "User not found." });

            return Ok(new { message = "Password reset link sent." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO dto)
        {
            var success = await _userService.ResetPasswordAsync(dto.Token, dto.NewPassword);
            if (!success) return BadRequest(new { message = "Invalid or expired token." });

            return Ok(new { message = "Password updated successfully." });
        }

    }
}
