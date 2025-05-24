using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class PaymentMethod
{
    public int PaymentMethodId { get; set; }

    public string MethodName { get; set; } = null!;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
