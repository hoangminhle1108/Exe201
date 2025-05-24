using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class HealthMetric
{
    public int MetricId { get; set; }

    public int UserId { get; set; }

    public DateOnly MetricDate { get; set; }

    public decimal? Weight { get; set; }

    public decimal? Height { get; set; }

    public decimal? BodyFat { get; set; }

    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
