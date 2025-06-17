using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.DTOs.UserDTO
{
    public class VerifyOTPDTO
    {
        public string Email { get; set; }
        public string OTP { get; set; }
    }

    public class ResetPasswordDTO
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }
}
