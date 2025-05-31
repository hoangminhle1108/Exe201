using HealthMate.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Repository.Interface.PremiumPackage
{
    public interface IPremiumPackageRepository
    {
        Task<List<Models.PremiumPackage>> GetAllAsync();
        Task<Models.PremiumPackage?> GetByIdAsync(int packageId);
        Task<Models.PremiumPackage> CreateAsync(Models.PremiumPackage package);
        Task<Models.PremiumPackage?> UpdateAsync(Models.PremiumPackage package);
        Task<bool> DeleteAsync(int packageId);
        Task<bool> IsPackageNameUniqueAsync(string packageName, int? excludePackageId = null);
        Task<int> GetActiveSubscribersCountAsync(int packageId);
        Task<List<Models.PremiumPackage>> GetActivePackagesAsync();
    }
} 