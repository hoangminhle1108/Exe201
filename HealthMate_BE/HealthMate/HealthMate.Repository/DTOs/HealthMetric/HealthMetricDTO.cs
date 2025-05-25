using System.ComponentModel.DataAnnotations;

namespace HealthMate.Repository.DTOs.HealthMetric
{
    public class HealthMetricDTO
    {
        public int MetricId { get; set; }
        public DateOnly MetricDate { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Height { get; set; }
        public decimal? BodyFat { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateHealthMetricRequest
    {
        [Required]
        public DateOnly MetricDate { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Height { get; set; }
        public decimal? BodyFat { get; set; }
        [StringLength(500)]
        public string? Note { get; set; }
    }

    public class UpdateHealthMetricRequest
    {
        [Required]
        public DateOnly MetricDate { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Height { get; set; }
        public decimal? BodyFat { get; set; }
        [StringLength(500)]
        public string? Note { get; set; }
    }
} 