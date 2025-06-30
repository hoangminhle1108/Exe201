using System;
using System.Collections.Generic;

namespace HealthMate.Repository.DTOs.Dashboard
{
    public class DashboardOverviewDTO
    {
        public int TotalUsers { get; set; }
        public int ActiveUsers { get; set; }
        public int PremiumUsers { get; set; }
        public int TotalRecipes { get; set; }
        public int TotalArticles { get; set; }
        public int TotalTransactions { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public decimal WeeklyRevenue { get; set; }
    }

    public class UserGrowthDTO
    {
        public DateTime Date { get; set; }
        public int NewUsers { get; set; }
        public int TotalUsers { get; set; }
    }

    public class RevenueChartDTO
    {
        public DateTime Date { get; set; }
        public decimal Revenue { get; set; }
        public int TransactionCount { get; set; }
    }

    public class TopRecipeDTO
    {
        public int RecipeId { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public int ViewCount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class TopArticleDTO
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public int ViewCount { get; set; }
        public string Author { get; set; }
        public DateTime PublishedAt { get; set; }
    }

    public class TransactionSummaryDTO
    {
        public int TransactionId { get; set; }
        public string TransactionCode { get; set; }
        public string UserEmail { get; set; }
        public string PackageName { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public DateTime PurchasedAt { get; set; }
    }

    public class HealthMetricsSummaryDTO
    {
        public int TotalRecords { get; set; }
        public double AverageWeight { get; set; }
        public double AverageHeight { get; set; }
        public double AverageBMI { get; set; }
        public List<HealthMetricTrendDTO> Trends { get; set; } = new List<HealthMetricTrendDTO>();
    }

    public class HealthMetricTrendDTO
    {
        public DateTime Date { get; set; }
        public double AverageWeight { get; set; }
        public double AverageHeight { get; set; }
        public double AverageBMI { get; set; }
        public int RecordCount { get; set; }
    }

    public class DashboardFiltersDTO
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? UserRole { get; set; }
        public string? TransactionStatus { get; set; }
    }
} 