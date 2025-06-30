using HealthMate.Repository.DTOs.Dashboard;
using HealthMate.Repository.Interface.Dashboard;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Repository.Repository.Dashboard
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly NutritionAppContext _context;

        public DashboardRepository(NutritionAppContext context)
        {
            _context = context;
        }

        public async Task<DashboardOverviewDTO> GetDashboardOverviewAsync(DashboardFiltersDTO filters)
        {
            var query = _context.Users.Where(r => r.RoleId != 3).AsQueryable();
            var transactionQuery = _context.Transactions.AsQueryable();

            // Apply filters
            if (filters.StartDate.HasValue)
            {
                query = query.Where(u => u.CreatedAt >= filters.StartDate.Value);
                transactionQuery = transactionQuery.Where(t => t.PurchasedAt >= filters.StartDate.Value);
            }

            if (filters.EndDate.HasValue)
            {
                query = query.Where(u => u.CreatedAt <= filters.EndDate.Value);
                transactionQuery = transactionQuery.Where(t => t.PurchasedAt <= filters.EndDate.Value);
            }

            if (!string.IsNullOrEmpty(filters.UserRole))
            {
                query = query.Where(u => u.Role.RoleName == filters.UserRole);
            }

            if (!string.IsNullOrEmpty(filters.TransactionStatus))
            {
                transactionQuery = transactionQuery.Where(t => t.Status == filters.TransactionStatus);
            }

            var totalUsers = await query.CountAsync();
            var activeUsers = await query.Where(u => u.IsActive).CountAsync();
            var premiumUsers = await query.Where(u => u.PremiumExpiry > DateTime.Now).CountAsync();
            var totalRecipes = await _context.Recipes.CountAsync();
            var totalArticles = await _context.Articles.CountAsync();
            var totalTransactions = await transactionQuery.CountAsync();

            var totalRevenue = await transactionQuery
                .Where(t => t.Status == "Completed")
                .SumAsync(t => t.Amount);

            var monthlyRevenue = await transactionQuery
                .Where(t => t.Status == "Completed" && t.PurchasedAt >= DateTime.Now.AddMonths(-1))
                .SumAsync(t => t.Amount);

            var weeklyRevenue = await transactionQuery
                .Where(t => t.Status == "Completed" && t.PurchasedAt >= DateTime.Now.AddDays(-7))
                .SumAsync(t => t.Amount);

            return new DashboardOverviewDTO
            {
                TotalUsers = totalUsers,
                ActiveUsers = activeUsers,
                PremiumUsers = premiumUsers,
                TotalRecipes = totalRecipes,
                TotalArticles = totalArticles,
                TotalTransactions = totalTransactions,
                TotalRevenue = totalRevenue,
                MonthlyRevenue = monthlyRevenue,
                WeeklyRevenue = weeklyRevenue
            };
        }

        public async Task<List<UserGrowthDTO>> GetUserGrowthAsync(DateTime startDate, DateTime endDate)
        {
            // Validate date range
            var minDate = new DateTime(1753, 1, 1);
            var maxDate = new DateTime(9999, 12, 31, 23, 59, 59);
            
            if (startDate < minDate) startDate = minDate;
            if (endDate > maxDate) endDate = maxDate;
            if (startDate > endDate) startDate = endDate;

            var userGrowth = await _context.Users
                .Where(u => u.CreatedAt >= startDate && u.CreatedAt <= endDate)
                .GroupBy(u => u.CreatedAt.Date)
                .Select(g => new UserGrowthDTO
                {
                    Date = g.Key,
                    NewUsers = g.Count(),
                    TotalUsers = _context.Users.Count(u => u.CreatedAt <= g.Key)
                })
                .OrderBy(x => x.Date)
                .ToListAsync();

            return userGrowth;
        }

        public async Task<List<RevenueChartDTO>> GetRevenueChartAsync(DateTime startDate, DateTime endDate)
        {
            // Validate date range
            var minDate = new DateTime(1753, 1, 1);
            var maxDate = new DateTime(9999, 12, 31, 23, 59, 59);
            
            if (startDate < minDate) startDate = minDate;
            if (endDate > maxDate) endDate = maxDate;
            if (startDate > endDate) startDate = endDate;

            var revenueChart = await _context.Transactions
                .Where(t => t.Status == "Completed" && t.PurchasedAt >= startDate && t.PurchasedAt <= endDate)
                .GroupBy(t => t.PurchasedAt.Date)
                .Select(g => new RevenueChartDTO
                {
                    Date = g.Key,
                    Revenue = g.Sum(t => t.Amount),
                    TransactionCount = g.Count()
                })
                .OrderBy(x => x.Date)
                .ToListAsync();

            return revenueChart;
        }

        public async Task<List<TopRecipeDTO>> GetTopRecipesAsync(int limit = 10)
        {
            var topRecipes = await _context.Recipes
                .OrderByDescending(r => r.CreatedAt)
                .Take(limit)
                .Select(r => new TopRecipeDTO
                {
                    RecipeId = r.RecipeId,
                    Title = r.Title,
                    ImageUrl = r.ImageUrl,
                    ViewCount = 0, // Cần thêm field ViewCount vào model Recipe
                    CreatedBy = r.CreatedByNavigation.FullName ?? r.CreatedByNavigation.Email,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return topRecipes;
        }

        public async Task<List<TopArticleDTO>> GetTopArticlesAsync(int limit = 10)
        {
            var topArticles = await _context.Articles
                .OrderByDescending(a => a.PublishedAt)
                .Take(limit)
                .Select(a => new TopArticleDTO
                {
                    ArticleId = a.ArticleId,
                    Title = a.Title,
                    ImageUrl = a.ImageUrl,
                    ViewCount = 0, // Cần thêm field ViewCount vào model Article
                    Author = a.Author,
                    PublishedAt = a.PublishedAt
                })
                .ToListAsync();

            return topArticles;
        }

        public async Task<List<TransactionSummaryDTO>> GetRecentTransactionsAsync(int limit = 10)
        {
            var recentTransactions = await _context.Transactions
                .OrderByDescending(t => t.PurchasedAt)
                .Take(limit)
                .Select(t => new TransactionSummaryDTO
                {
                    TransactionId = t.TransactionId,
                    TransactionCode = t.TransactionCode,
                    UserEmail = t.User.Email,
                    PackageName = t.Package.PackageName,
                    Amount = t.Amount,
                    Status = t.Status,
                    PurchasedAt = t.PurchasedAt
                })
                .ToListAsync();

            return recentTransactions;
        }

        public async Task<HealthMetricsSummaryDTO> GetHealthMetricsSummaryAsync(DateTime startDate, DateTime endDate)
        {
            // Validate date range
            var minDate = new DateTime(1753, 1, 1);
            var maxDate = new DateTime(9999, 12, 31, 23, 59, 59);
            
            if (startDate < minDate) startDate = minDate;
            if (endDate > maxDate) endDate = maxDate;
            if (startDate > endDate) startDate = endDate;

            var metrics = await _context.HealthMetrics
                .Where(h => h.CreatedAt >= startDate && h.CreatedAt <= endDate)
                .ToListAsync();

            if (!metrics.Any())
            {
                return new HealthMetricsSummaryDTO
                {
                    TotalRecords = 0,
                    AverageWeight = 0,
                    AverageHeight = 0,
                    AverageBMI = 0,
                    Trends = new List<HealthMetricTrendDTO>()
                };
            }

            var averageWeight = metrics.Average(h => (double)h.Weight);
            var averageHeight = metrics.Average(h => (double)h.Height);
            var averageBMI = metrics.Average(h => CalculateBMI((double)h.Weight, (double)h.Height));

            var trends = await GetHealthMetricsTrendAsync(startDate, endDate);

            return new HealthMetricsSummaryDTO
            {
                TotalRecords = metrics.Count,
                AverageWeight = Math.Round(averageWeight, 2),
                AverageHeight = Math.Round(averageHeight, 2),
                AverageBMI = Math.Round(averageBMI, 2),
                Trends = trends
            };
        }

        public async Task<List<HealthMetricTrendDTO>> GetHealthMetricsTrendAsync(DateTime startDate, DateTime endDate)
        {
            // Validate date range
            var minDate = new DateTime(1753, 1, 1);
            var maxDate = new DateTime(9999, 12, 31, 23, 59, 59);
            
            if (startDate < minDate) startDate = minDate;
            if (endDate > maxDate) endDate = maxDate;
            if (startDate > endDate) startDate = endDate;

            var trends = await _context.HealthMetrics
                .Where(h => h.CreatedAt >= startDate && h.CreatedAt <= endDate)
                .GroupBy(h => h.CreatedAt.Date)
                .Select(g => new HealthMetricTrendDTO
                {
                    Date = g.Key,
                    AverageWeight = g.Average(h => (double)h.Weight),
                    AverageHeight = g.Average(h => (double)h.Height),
                    AverageBMI = g.Average(h => CalculateBMI((double)h.Weight, (double)h.Height)),
                    RecordCount = g.Count()
                })
                .OrderBy(x => x.Date)
                .ToListAsync();

            return trends;
        }

        public async Task<Dictionary<string, int>> GetUserRoleDistributionAsync()
        {
            var roleDistribution = await _context.Users
                .GroupBy(u => u.Role.RoleName)
                .Select(g => new { RoleName = g.Key, Count = g.Count() })
                .ToListAsync();

            return roleDistribution.ToDictionary(x => x.RoleName, x => x.Count);
        }

        public async Task<Dictionary<string, int>> GetTransactionStatusDistributionAsync()
        {
            var statusDistribution = await _context.Transactions
                .GroupBy(t => t.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() })
                .ToListAsync();

            return statusDistribution.ToDictionary(x => x.Status, x => x.Count);
        }

        public async Task<Dictionary<string, decimal>> GetRevenueByPackageAsync(DateTime startDate, DateTime endDate)
        {
            // Validate date range
            var minDate = new DateTime(1753, 1, 1);
            var maxDate = new DateTime(9999, 12, 31, 23, 59, 59);
            
            if (startDate < minDate) startDate = minDate;
            if (endDate > maxDate) endDate = maxDate;
            if (startDate > endDate) startDate = endDate;

            var revenueByPackage = await _context.Transactions
                .Where(t => t.Status == "Completed" && t.PurchasedAt >= startDate && t.PurchasedAt <= endDate)
                .GroupBy(t => t.Package.PackageName)
                .Select(g => new { PackageName = g.Key, Revenue = g.Sum(t => t.Amount) })
                .ToListAsync();

            return revenueByPackage.ToDictionary(x => x.PackageName, x => x.Revenue);
        }

        private double CalculateBMI(double weight, double height)
        {
            if (height <= 0) return 0;
            var heightInMeters = height / 100; // Convert cm to meters
            return weight / (heightInMeters * heightInMeters);
        }
    }
} 