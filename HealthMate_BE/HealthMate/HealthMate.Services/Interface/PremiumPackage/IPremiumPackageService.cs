using HealthMate.Repository.DTOs.PremiumPackage;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.PremiumPackage
{
    public interface IPremiumPackageService
    {
        Task<List<PremiumPackageDTO>> GetAllAsync();
        Task<PremiumPackageDTO?> GetByIdAsync(int packageId);
        Task<PremiumPackageDTO> CreateAsync(CreatePremiumPackageRequest request);
        Task<PremiumPackageDTO?> UpdateAsync(int packageId, UpdatePremiumPackageRequest request);
        Task<bool> DeleteAsync(int packageId);
        Task<List<PremiumPackageDTO>> GetActivePackagesAsync();
    }
} 