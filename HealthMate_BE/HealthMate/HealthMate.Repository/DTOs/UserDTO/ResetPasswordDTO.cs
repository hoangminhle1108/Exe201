using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.DTOs.UserDTO
{
    public class ResetPasswordDTO
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }

}
