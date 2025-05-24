using HealthMate.Repository.DTOs.Login;
using HealthMate.Services.Interface.User;
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
        public AuthController(IAuthService auth) => _auth = auth;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var resp = await _auth.AuthenticateAsync(req);
            if (resp == null)
                return Unauthorized(new { message = "Email hoặc mật khẩu không đúng" });
            return Ok(resp);
        }

        [HttpGet("login/google")]
        public IActionResult GoogleLogin()
        {
            var redirectUrl = Url.Action("GoogleResponse", "Auth", null, Request.Scheme);
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, "Google");
        }

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            var result = await HttpContext.AuthenticateAsync("Google");
            if (!result.Succeeded || result.Principal == null)
                return Unauthorized();

            // Extract user info from Google claims
            var email = result.Principal.FindFirst(c => c.Type == System.Security.Claims.ClaimTypes.Email)?.Value;
            var name = result.Principal.FindFirst(c => c.Type == System.Security.Claims.ClaimTypes.Name)?.Value;

            if (string.IsNullOrEmpty(email))
                return BadRequest("Google account did not provide an email.");

            // Optionally: Check if user exists in your DB, create if not (pseudo-code)
            // await _auth.EnsureUserExistsAsync(email, name);

            // Generate JWT token for this user (you may need to adapt this)
            //var loginRequest = new LoginRequest { Email = email, Password = "" };  Password may not be needed for Google users
            var resp = await _auth.AuthenticateGoogleAsync(email, name);

            if (resp == null)
                return Unauthorized(new { message = "Unable to authenticate Google user." });

            // Optionally: sign out of the external cookie
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok(resp);
        }
    }
}
