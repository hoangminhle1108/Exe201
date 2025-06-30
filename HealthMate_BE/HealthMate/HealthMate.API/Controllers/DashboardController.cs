using HealthMate.Repository.DTOs.Dashboard;
using HealthMate.Services.Interface.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        /// <summary>
        /// Lấy tổng quan dashboard
        /// </summary>
        [HttpGet("overview")]
        public async Task<ActionResult<DashboardOverviewDTO>> GetDashboardOverview(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null,
            [FromQuery] string? userRole = null,
            [FromQuery] string? transactionStatus = null)
        {
            try
            {
                var filters = new DashboardFiltersDTO
                {
                    StartDate = startDate,
                    EndDate = endDate,
                    UserRole = userRole,
                    TransactionStatus = transactionStatus
                };

                var result = await _dashboardService.GetDashboardOverviewAsync(filters);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy dữ liệu dashboard", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy dữ liệu tăng trưởng người dùng
        /// </summary>
        [HttpGet("user-growth")]
        public async Task<ActionResult<List<UserGrowthDTO>>> GetUserGrowth(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                // Validate date parameters
                if (startDate == default(DateTime) || endDate == default(DateTime))
                {
                    return BadRequest(new { message = "startDate và endDate là bắt buộc" });
                }

                // Set default date range if not provided
                if (startDate == DateTime.MinValue)
                {
                    startDate = DateTime.Now.AddDays(-30);
                }
                if (endDate == DateTime.MinValue)
                {
                    endDate = DateTime.Now;
                }

                var result = await _dashboardService.GetUserGrowthAsync(startDate, endDate);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy dữ liệu tăng trưởng người dùng", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy dữ liệu biểu đồ doanh thu
        /// </summary>
        [HttpGet("revenue-chart")]
        public async Task<ActionResult<List<RevenueChartDTO>>> GetRevenueChart(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                // Validate date parameters
                if (startDate == default(DateTime) || endDate == default(DateTime))
                {
                    return BadRequest(new { message = "startDate và endDate là bắt buộc" });
                }

                // Set default date range if not provided
                if (startDate == DateTime.MinValue)
                {
                    startDate = DateTime.Now.AddDays(-30);
                }
                if (endDate == DateTime.MinValue)
                {
                    endDate = DateTime.Now;
                }

                var result = await _dashboardService.GetRevenueChartAsync(startDate, endDate);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy dữ liệu biểu đồ doanh thu", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy danh sách công thức nấu ăn phổ biến
        /// </summary>
        [HttpGet("top-recipes")]
        public async Task<ActionResult<List<TopRecipeDTO>>> GetTopRecipes([FromQuery] int limit = 10)
        {
            try
            {
                var result = await _dashboardService.GetTopRecipesAsync(limit);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy danh sách công thức nấu ăn", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy danh sách bài viết phổ biến
        /// </summary>
        [HttpGet("top-articles")]
        public async Task<ActionResult<List<TopArticleDTO>>> GetTopArticles([FromQuery] int limit = 10)
        {
            try
            {
                var result = await _dashboardService.GetTopArticlesAsync(limit);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy danh sách bài viết", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy danh sách giao dịch gần đây
        /// </summary>
        [HttpGet("recent-transactions")]
        public async Task<ActionResult<List<TransactionSummaryDTO>>> GetRecentTransactions([FromQuery] int limit = 10)
        {
            try
            {
                var result = await _dashboardService.GetRecentTransactionsAsync(limit);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy danh sách giao dịch", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy tổng quan chỉ số sức khỏe
        /// </summary>
        [HttpGet("health-metrics-summary")]
        public async Task<ActionResult<HealthMetricsSummaryDTO>> GetHealthMetricsSummary(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                // Validate date parameters
                if (startDate == default(DateTime) || endDate == default(DateTime))
                {
                    return BadRequest(new { message = "startDate và endDate là bắt buộc" });
                }

                // Set default date range if not provided
                if (startDate == DateTime.MinValue)
                {
                    startDate = DateTime.Now.AddDays(-30);
                }
                if (endDate == DateTime.MinValue)
                {
                    endDate = DateTime.Now;
                }

                var result = await _dashboardService.GetHealthMetricsSummaryAsync(startDate, endDate);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy tổng quan chỉ số sức khỏe", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy xu hướng chỉ số sức khỏe
        /// </summary>
        [HttpGet("health-metrics-trend")]
        public async Task<ActionResult<List<HealthMetricTrendDTO>>> GetHealthMetricsTrend(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                // Validate date parameters
                if (startDate == default(DateTime) || endDate == default(DateTime))
                {
                    return BadRequest(new { message = "startDate và endDate là bắt buộc" });
                }

                // Set default date range if not provided
                if (startDate == DateTime.MinValue)
                {
                    startDate = DateTime.Now.AddDays(-30);
                }
                if (endDate == DateTime.MinValue)
                {
                    endDate = DateTime.Now;
                }

                var result = await _dashboardService.GetHealthMetricsTrendAsync(startDate, endDate);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy xu hướng chỉ số sức khỏe", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy phân bố vai trò người dùng
        /// </summary>
        [HttpGet("user-role-distribution")]
        public async Task<ActionResult<Dictionary<string, int>>> GetUserRoleDistribution()
        {
            try
            {
                var result = await _dashboardService.GetUserRoleDistributionAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy phân bố vai trò người dùng", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy phân bố trạng thái giao dịch
        /// </summary>
        [HttpGet("transaction-status-distribution")]
        public async Task<ActionResult<Dictionary<string, int>>> GetTransactionStatusDistribution()
        {
            try
            {
                var result = await _dashboardService.GetTransactionStatusDistributionAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy phân bố trạng thái giao dịch", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy doanh thu theo gói premium
        /// </summary>
        [HttpGet("revenue-by-package")]
        public async Task<ActionResult<Dictionary<string, decimal>>> GetRevenueByPackage(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            try
            {
                // Validate date parameters
                if (startDate == default(DateTime) || endDate == default(DateTime))
                {
                    return BadRequest(new { message = "startDate và endDate là bắt buộc" });
                }

                // Set default date range if not provided
                if (startDate == DateTime.MinValue)
                {
                    startDate = DateTime.Now.AddDays(-30);
                }
                if (endDate == DateTime.MinValue)
                {
                    endDate = DateTime.Now;
                }

                var result = await _dashboardService.GetRevenueByPackageAsync(startDate, endDate);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy doanh thu theo gói", error = ex.Message });
            }
        }
    }
} 