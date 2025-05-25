using HealthMate.Repository.DTOs.HealthMetric;
using HealthMate.Repository.Interface.HealthMetric;
using HealthMate.Services.Interface.HealthMetric;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.HealthMetric
{
    public class HealthMetricService : IHealthMetricService
    {
        private readonly IHealthMetricRepository _repo;
        public HealthMetricService(IHealthMetricRepository repo) => _repo = repo;

        public async Task<List<HealthMetricDTO>> GetAllByUserIdAsync(int userId)
        {
            var metrics = await _repo.GetAllByUserIdAsync(userId);
            return metrics.Select(MapToDTO).ToList();
        }

        public async Task<HealthMetricDTO?> GetByIdAsync(int metricId, int userId)
        {
            var metric = await _repo.GetByIdAsync(metricId, userId);
            return metric != null ? MapToDTO(metric) : null;
        }

        public async Task<HealthMetricDTO> CreateAsync(int userId, CreateHealthMetricRequest request)
        {
            var metric = new Repository.Models.HealthMetric
            {
                UserId = userId,
                MetricDate = request.MetricDate,
                Weight = request.Weight,
                Height = request.Height,
                BodyFat = request.BodyFat,
                Note = request.Note,
                CreatedAt = System.DateTime.UtcNow
            };
            var created = await _repo.CreateAsync(metric);
            return MapToDTO(created);
        }

        public async Task<HealthMetricDTO?> UpdateAsync(int userId, int metricId, UpdateHealthMetricRequest request)
        {
            var existing = await _repo.GetByIdAsync(metricId, userId);
            if (existing == null) return null;
            existing.MetricDate = request.MetricDate;
            existing.Weight = request.Weight;
            existing.Height = request.Height;
            existing.BodyFat = request.BodyFat;
            existing.Note = request.Note;
            var updated = await _repo.UpdateAsync(existing);
            return updated != null ? MapToDTO(updated) : null;
        }

        public async Task<bool> DeleteAsync(int userId, int metricId)
        {
            return await _repo.DeleteAsync(metricId, userId);
        }

        private static HealthMetricDTO MapToDTO(Repository.Models.HealthMetric metric)
        {
            return new HealthMetricDTO
            {
                MetricId = metric.MetricId,
                MetricDate = metric.MetricDate,
                Weight = metric.Weight,
                Height = metric.Height,
                BodyFat = metric.BodyFat,
                Note = metric.Note,
                CreatedAt = metric.CreatedAt
            };
        }
    }
} 