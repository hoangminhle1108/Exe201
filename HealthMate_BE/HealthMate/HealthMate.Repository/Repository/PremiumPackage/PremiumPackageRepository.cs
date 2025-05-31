using HealthMate.Repository.Interface.PremiumPackage;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Repository.Repository.PremiumPackage
{
    public class PremiumPackageRepository : IPremiumPackageRepository
    {
        private readonly NutritionAppContext _ctx;
        public PremiumPackageRepository(NutritionAppContext ctx) => _ctx = ctx;

        public async Task<List<Models.PremiumPackage>> GetAllAsync()
        {
            return await _ctx.PremiumPackages
                .Include(p => p.Transactions)
                .OrderBy(p => p.Price)
                .ToListAsync();
        }

        public async Task<Models.PremiumPackage?> GetByIdAsync(int packageId)
        {
            return await _ctx.PremiumPackages
                .Include(p => p.Transactions)
                .FirstOrDefaultAsync(p => p.PackageId == packageId);
        }

        public async Task<Models.PremiumPackage> CreateAsync(Models.PremiumPackage package)
        {
            _ctx.PremiumPackages.Add(package);
            await _ctx.SaveChangesAsync();
            return package;
        }

        public async Task<Models.PremiumPackage?> UpdateAsync(Models.PremiumPackage package)
        {
            var existing = await _ctx.PremiumPackages
                .FirstOrDefaultAsync(p => p.PackageId == package.PackageId);
            
            if (existing == null) return null;

            existing.PackageName = package.PackageName;
            existing.Description = package.Description;
            existing.Price = package.Price;
            existing.DurationDays = package.DurationDays;

            await _ctx.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int packageId)
        {
            var package = await _ctx.PremiumPackages
                .Include(p => p.Transactions)
                .FirstOrDefaultAsync(p => p.PackageId == packageId);

            if (package == null) return false;

            // Check if package has active subscribers
            var hasActiveSubscribers = package.Transactions
                .Any(t => t.Status == "Completed" && 
                         t.User.PremiumExpiry > DateTime.UtcNow);

            if (hasActiveSubscribers)
            {
                throw new InvalidOperationException("Cannot delete package with active subscribers");
            }

            _ctx.PremiumPackages.Remove(package);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsPackageNameUniqueAsync(string packageName, int? excludePackageId = null)
        {
            var query = _ctx.PremiumPackages.AsQueryable();
            
            if (excludePackageId.HasValue)
            {
                query = query.Where(p => p.PackageId != excludePackageId.Value);
            }

            return !await query.AnyAsync(p => p.PackageName == packageName);
        }

        public async Task<int> GetActiveSubscribersCountAsync(int packageId)
        {
            return await _ctx.Transactions
                .Where(t => t.PackageId == packageId && 
                           t.Status == "Completed" && 
                           t.User.PremiumExpiry > DateTime.UtcNow)
                .CountAsync();
        }

        public async Task<List<Models.PremiumPackage>> GetActivePackagesAsync()
        {
            return await _ctx.PremiumPackages
                .Include(p => p.Transactions)
                .Where(p => p.Transactions.Any(t => t.Status == "Completed"))
                .OrderBy(p => p.Price)
                .ToListAsync();
        }
    }
} 