using HealthMate.Repository.DTOs.HealthMetric;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.HealthMetric
{
    public interface IHealthMetricService
    {
        Task<List<HealthMetricDTO>> GetAllByUserIdAsync(int userId);
        Task<HealthMetricDTO?> GetByIdAsync(int metricId, int userId);
        Task<HealthMetricDTO> CreateAsync(int userId, CreateHealthMetricRequest request);
        Task<HealthMetricDTO?> UpdateAsync(int userId, int metricId, UpdateHealthMetricRequest request);
        Task<bool> DeleteAsync(int userId, int metricId);
    }
} 