using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? FullName { get; set; }

    public string? AvatarUrl { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public bool IsGoogle { get; set; }

    public int RoleId { get; set; }

    public DateTime TermsAcceptedAt { get; set; }

    public DateTime? PremiumExpiry { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<HealthMetric> HealthMetrics { get; set; } = new List<HealthMetric>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
