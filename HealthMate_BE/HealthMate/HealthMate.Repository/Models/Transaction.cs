using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class Transaction
{
    public int TransactionId { get; set; }

    public int UserId { get; set; }

    public int PackageId { get; set; }

    public int PaymentMethodId { get; set; }

    public string TransactionCode { get; set; } = null!;

    public decimal Amount { get; set; }

    public string Status { get; set; } = null!;

    public DateTime PurchasedAt { get; set; }

    public virtual PremiumPackage Package { get; set; } = null!;

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
