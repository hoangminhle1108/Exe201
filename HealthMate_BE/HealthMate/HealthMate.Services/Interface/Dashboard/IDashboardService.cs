using HealthMate.Repository.DTOs.Dashboard;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.Dashboard
{
    public interface IDashboardService
    {
        Task<DashboardOverviewDTO> GetDashboardOverviewAsync(DashboardFiltersDTO filters);
        Task<List<UserGrowthDTO>> GetUserGrowthAsync(DateTime startDate, DateTime endDate);
        Task<List<RevenueChartDTO>> GetRevenueChartAsync(DateTime startDate, DateTime endDate);
        Task<List<TopRecipeDTO>> GetTopRecipesAsync(int limit = 10);
        Task<List<TopArticleDTO>> GetTopArticlesAsync(int limit = 10);
        Task<List<TransactionSummaryDTO>> GetRecentTransactionsAsync(int limit = 10);
        Task<HealthMetricsSummaryDTO> GetHealthMetricsSummaryAsync(DateTime startDate, DateTime endDate);
        Task<List<HealthMetricTrendDTO>> GetHealthMetricsTrendAsync(DateTime startDate, DateTime endDate);
        Task<Dictionary<string, int>> GetUserRoleDistributionAsync();
        Task<Dictionary<string, int>> GetTransactionStatusDistributionAsync();
        Task<Dictionary<string, decimal>> GetRevenueByPackageAsync(DateTime startDate, DateTime endDate);
    }
} 