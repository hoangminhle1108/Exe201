using HealthMate.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.Interface.User
{
    public interface IUserRepository
    {
         Task<HealthMate.Repository.Models.User> GetByEmailAndPasswordAsync(string email, string password);
    }
}
