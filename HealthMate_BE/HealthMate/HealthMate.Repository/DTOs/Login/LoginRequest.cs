﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.DTOs.Login
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class GoogleLoginRequest
    {
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
