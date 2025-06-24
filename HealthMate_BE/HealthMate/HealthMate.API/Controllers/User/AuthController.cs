using HealthMate.Repository.DTOs.Login;
using HealthMate.Repository.Interface.User;
using HealthMate.Services.Interface.User;
using HealthMate.Services.Service.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace HealthMate.API.Controllers.User
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        public AuthController(IAuthService auth, IUserService userService, IJwtService jwtService) { 
            _auth = auth;
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var resp = await _auth.AuthenticateAsync(req);
            if (resp == null)
                return Unauthorized(new { message = "Email hoặc mật khẩu không đúng" });
            return Ok(resp);
        }

        [HttpPost("login-google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest model)
        {
            // model.Email, model.FullName
            if (string.IsNullOrEmpty(model.Email))
                return BadRequest("Email is required.");

            // Tạo user Google nếu chưa có
            var user = await _userService.GoogleLoginAsync(model.Email, model.FullName);

            // (Tùy chọn) Tạo JWT token cho user
            var token = _jwtService.GenerateToken(user);

            // Trả về thông tin user và token
            return Ok(new
            {
                user = new
                {
                    user.UserId,
                    user.Email,
                    user.FullName,
                    user.AvatarUrl,
                    user.RoleId,
                    user.PremiumExpiry,
                    user.IsActive
                },
                token
            });
        }

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            try 
            {
                var result = await HttpContext.AuthenticateAsync("Google");
                if (!result.Succeeded)
                {
                    return Unauthorized(new { message = "Google authentication failed" });
                }
                
                if (result.Principal == null)
                {
                    return Unauthorized(new { message = "No principal found in Google authentication" });
                }

                // Extract user info from Google claims
                var email = result.Principal.FindFirst(c => c.Type == System.Security.Claims.ClaimTypes.Email)?.Value;
                var name = result.Principal.FindFirst(c => c.Type == System.Security.Claims.ClaimTypes.Name)?.Value;
                var googleId = result.Principal.FindFirst(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest(new { message = "Google account did not provide an email" });
                }

                // Authenticate with Google info
                var resp = await _auth.AuthenticateGoogleAsync(email, name);
                if (resp == null)
                {
                    return Unauthorized(new { message = "Unable to authenticate Google user" });
                }

                // Sign out of the external cookie
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                return Ok(new { 
                    token = resp.Token,
                    expires = resp.Expires,
                    email = email,
                    name = name
                });
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, new { message = "An error occurred during Google authentication", error = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Invalid registration data", errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage) });
                }

                var resp = await _auth.RegisterAsync(request);
                return Ok(new { 
                    token = resp.Token,
                    expires = resp.Expires,
                    message = "Registration successful"
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, new { message = "An error occurred during registration", error = ex.Message });
            }
        }

    }
}
