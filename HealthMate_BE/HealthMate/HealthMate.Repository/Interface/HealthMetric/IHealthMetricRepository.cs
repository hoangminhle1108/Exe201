using HealthMate.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Repository.Interface.HealthMetric
{
    public interface IHealthMetricRepository
    {
        Task<List<Models.HealthMetric>> GetAllByUserIdAsync(int userId);
        Task<Models.HealthMetric?> GetByIdAsync(int metricId, int userId);
        Task<Models.HealthMetric> CreateAsync(Models.HealthMetric metric);
        Task<Models.HealthMetric?> UpdateAsync(Models.HealthMetric metric);
        Task<bool> DeleteAsync(int metricId, int userId);
        Task<Models.HealthMetric?> GetByUserIdAndDateAsync(int userId, DateOnly date);
    }
} 