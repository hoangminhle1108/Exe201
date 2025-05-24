using HealthMate.Repository.DTOs.Login;
using HealthMate.Services.Interface.User;
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
    }
}
