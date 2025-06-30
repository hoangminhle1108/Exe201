using HealthMate.Repository.DTOs.Dashboard;
using HealthMate.Repository.Interface.Dashboard;
using HealthMate.Services.Interface.Dashboard;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.Dashboard
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public async Task<DashboardOverviewDTO> GetDashboardOverviewAsync(DashboardFiltersDTO filters)
        {
            return await _dashboardRepository.GetDashboardOverviewAsync(filters);
        }

        public async Task<List<UserGrowthDTO>> GetUserGrowthAsync(DateTime startDate, DateTime endDate)
        {
            return await _dashboardRepository.GetUserGrowthAsync(startDate, endDate);
        }

        public async Task<List<RevenueChartDTO>> GetRevenueChartAsync(DateTime startDate, DateTime endDate)
        {
            return await _dashboardRepository.GetRevenueChartAsync(startDate, endDate);
        }

        public async Task<List<TopRecipeDTO>> GetTopRecipesAsync(int limit = 10)
        {
            return await _dashboardRepository.GetTopRecipesAsync(limit);
        }

        public async Task<List<TopArticleDTO>> GetTopArticlesAsync(int limit = 10)
        {
            return await _dashboardRepository.GetTopArticlesAsync(limit);
        }

        public async Task<List<TransactionSummaryDTO>> GetRecentTransactionsAsync(int limit = 10)
        {
            return await _dashboardRepository.GetRecentTransactionsAsync(limit);
        }

        public async Task<HealthMetricsSummaryDTO> GetHealthMetricsSummaryAsync(DateTime startDate, DateTime endDate)
        {
            return await _dashboardRepository.GetHealthMetricsSummaryAsync(startDate, endDate);
        }

        public async Task<List<HealthMetricTrendDTO>> GetHealthMetricsTrendAsync(DateTime startDate, DateTime endDate)
        {
            return await _dashboardRepository.GetHealthMetricsTrendAsync(startDate, endDate);
        }

        public async Task<Dictionary<string, int>> GetUserRoleDistributionAsync()
        {
            return await _dashboardRepository.GetUserRoleDistributionAsync();
        }

        public async Task<Dictionary<string, int>> GetTransactionStatusDistributionAsync()
        {
            return await _dashboardRepository.GetTransactionStatusDistributionAsync();
        }

        public async Task<Dictionary<string, decimal>> GetRevenueByPackageAsync(DateTime startDate, DateTime endDate)
        {
            return await _dashboardRepository.GetRevenueByPackageAsync(startDate, endDate);
        }
    }
} 