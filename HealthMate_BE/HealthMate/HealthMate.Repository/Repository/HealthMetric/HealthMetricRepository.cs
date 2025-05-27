using HealthMate.Repository.Interface.HealthMetric;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Repository.Repository.HealthMetric
{
    public class HealthMetricRepository : IHealthMetricRepository
    {
        private readonly NutritionAppContext _ctx;
        public HealthMetricRepository(NutritionAppContext ctx) => _ctx = ctx;

        public async Task<List<Models.HealthMetric>> GetAllByUserIdAsync(int userId)
        {
            return await _ctx.HealthMetrics
                .Where(m => m.UserId == userId)
                .OrderByDescending(m => m.MetricDate)
                .ToListAsync();
        }

        public async Task<Models.HealthMetric?> GetByIdAsync(int metricId, int userId)
        {
            return await _ctx.HealthMetrics
                .FirstOrDefaultAsync(m => m.MetricId == metricId && m.UserId == userId);
        }

        public async Task<Models.HealthMetric> CreateAsync(Models.HealthMetric metric)
        {
            _ctx.HealthMetrics.Add(metric);
            await _ctx.SaveChangesAsync();
            return metric;
        }

        public async Task<Models.HealthMetric?> UpdateAsync(Models.HealthMetric metric)
        {
            var existing = await _ctx.HealthMetrics
                .FirstOrDefaultAsync(m => m.MetricId == metric.MetricId && m.UserId == metric.UserId);
            if (existing == null) return null;

            existing.MetricDate = metric.MetricDate;
            existing.Weight = metric.Weight;
            existing.Height = metric.Height;
            existing.BodyFat = metric.BodyFat;
            existing.Note = metric.Note;

            await _ctx.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int metricId, int userId)
        {
            var metric = await _ctx.HealthMetrics
                .FirstOrDefaultAsync(m => m.MetricId == metricId && m.UserId == userId);
            if (metric == null) return false;
            _ctx.HealthMetrics.Remove(metric);
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<Models.HealthMetric?> GetByUserIdAndDateAsync(int userId, DateOnly date)
        {
            return await _ctx.HealthMetrics
                .FirstOrDefaultAsync(m => m.UserId == userId && m.MetricDate == date);
        }
    }
} 