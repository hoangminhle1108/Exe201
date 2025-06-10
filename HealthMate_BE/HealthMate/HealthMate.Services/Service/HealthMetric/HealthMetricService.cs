using HealthMate.Repository.DTOs.HealthMetric;
using HealthMate.Repository.Interface.HealthMetric;
using HealthMate.Repository.Interface.User;
using HealthMate.Services.Interface.HealthMetric;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.HealthMetric
{
    public class HealthMetricService : IHealthMetricService
    {
        private readonly IHealthMetricRepository _repo;
        private readonly IUserRepository _userRepo;
        public HealthMetricService(IHealthMetricRepository repo, IUserRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;   
        }

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
            // First verify the user exists
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("User not found", nameof(userId));
            }

            // Validate request data
            if (request.MetricDate > DateOnly.FromDateTime(DateTime.UtcNow))
            {
                throw new ArgumentException("Metric date cannot be in the future", nameof(request.MetricDate));
            }

            // Try to get existing metric for this user and     date
            var existingMetric = await _repo.GetByUserIdAndDateAsync(userId, request.MetricDate);

            if (existingMetric != null)
            {
                // Update existing metric
                existingMetric.Weight = request.Weight;
                existingMetric.Height = request.Height;
                existingMetric.BodyFat = request.BodyFat;
                existingMetric.Note = request.Note;
                existingMetric.CreatedAt = DateTime.UtcNow;

                var updated = await _repo.UpdateAsync(existingMetric);
                if (updated == null)
                {
                    throw new InvalidOperationException("Failed to update health metric");
                }
                return MapToDTO(updated);
            }

            // Create new metric if none exists
            var metric = new Repository.Models.HealthMetric
            {
                UserId = userId,
                MetricDate = request.MetricDate,
                Weight = request.Weight,
                Height = request.Height,
                BodyFat = request.BodyFat,
                Note = request.Note,
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                var created = await _repo.CreateAsync(metric);
                return MapToDTO(created);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to create health metric", ex);
            }
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