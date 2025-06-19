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
    public class ChangePasswordDTO
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
