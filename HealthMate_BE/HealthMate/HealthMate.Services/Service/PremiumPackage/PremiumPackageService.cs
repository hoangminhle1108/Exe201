using HealthMate.Repository.DTOs.PremiumPackage;
using HealthMate.Repository.Interface.PremiumPackage;
using HealthMate.Services.Interface.PremiumPackage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.PremiumPackage
{
    public class PremiumPackageService : IPremiumPackageService
    {
        private readonly IPremiumPackageRepository _repo;

        public PremiumPackageService(IPremiumPackageRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<PremiumPackageDTO>> GetAllAsync()
        {
            var packages = await _repo.GetAllAsync();
            return await MapToDTOsAsync(packages);
        }

        public async Task<PremiumPackageDTO?> GetByIdAsync(int packageId)
        {
            var package = await _repo.GetByIdAsync(packageId);
            if (package == null) return null;

            var activeSubscribers = await _repo.GetActiveSubscribersCountAsync(packageId);
            return MapToDTO(package, activeSubscribers);
        }

        public async Task<PremiumPackageDTO> CreateAsync(CreatePremiumPackageRequest request)
        {
            // Validate package name uniqueness
            if (!await _repo.IsPackageNameUniqueAsync(request.PackageName))
            {
                throw new ArgumentException("Package name must be unique", nameof(request.PackageName));
            }

            // Validate price and duration
            ValidatePackageDetails(request.Price, request.DurationDays);

            var package = new Repository.Models.PremiumPackage
            {
                PackageName = request.PackageName,
                Description = request.Description,
                Price = request.Price,
                DurationDays = request.DurationDays
            };

            try
            {
                var created = await _repo.CreateAsync(package);
                return MapToDTO(created, 0); // New package has 0 subscribers
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to create premium package", ex);
            }
        }

        public async Task<PremiumPackageDTO?> UpdateAsync(int packageId, UpdatePremiumPackageRequest request)
        {
            // Check if package exists
            var existing = await _repo.GetByIdAsync(packageId);
            if (existing == null) return null;

            // Validate package name uniqueness (excluding current package)
            if (!await _repo.IsPackageNameUniqueAsync(request.PackageName, packageId))
            {
                throw new ArgumentException("Package name must be unique", nameof(request.PackageName));
            }

            // Validate price and duration
            ValidatePackageDetails(request.Price, request.DurationDays);

            // Check if package has active subscribers
            var activeSubscribers = await _repo.GetActiveSubscribersCountAsync(packageId);
            if (activeSubscribers > 0)
            {
                throw new InvalidOperationException("Cannot update package with active subscribers");
            }

            var package = new Repository.Models.PremiumPackage
            {
                PackageId = packageId,
                PackageName = request.PackageName,
                Description = request.Description,
                Price = request.Price,
                DurationDays = request.DurationDays
            };

            try
            {
                var updated = await _repo.UpdateAsync(package);
                if (updated == null) return null;

                return MapToDTO(updated, activeSubscribers);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to update premium package", ex);
            }
        }

        public async Task<bool> DeleteAsync(int packageId)
        {
            try
            {
                return await _repo.DeleteAsync(packageId);
            }
            catch (InvalidOperationException)
            {
                throw; // Re-throw business logic exceptions
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to delete premium package", ex);
            }
        }

        public async Task<List<PremiumPackageDTO>> GetActivePackagesAsync()
        {
            var packages = await _repo.GetActivePackagesAsync();
            return await MapToDTOsAsync(packages);
        }

        private async Task<List<PremiumPackageDTO>> MapToDTOsAsync(List<Repository.Models.PremiumPackage> packages)
        {
            var dtos = new List<PremiumPackageDTO>();
            foreach (var package in packages)
            {
                var activeSubscribers = await _repo.GetActiveSubscribersCountAsync(package.PackageId);
                dtos.Add(MapToDTO(package, activeSubscribers));
            }
            return dtos;
        }

        private static PremiumPackageDTO MapToDTO(Repository.Models.PremiumPackage package, int activeSubscribers)
        {
            return new PremiumPackageDTO
            {
                PackageId = package.PackageId,
                PackageName = package.PackageName,
                Description = package.Description,
                Price = package.Price,
                DurationDays = package.DurationDays,
                ActiveSubscribers = activeSubscribers
            };
        }

        private static void ValidatePackageDetails(decimal price, int durationDays)
        {
            if (price < 0)
            {
                throw new ArgumentException("Price cannot be negative", nameof(price));
            }

            if (durationDays < 1)
            {
                throw new ArgumentException("Duration must be at least 1 day", nameof(durationDays));
            }
        }
    }
} 