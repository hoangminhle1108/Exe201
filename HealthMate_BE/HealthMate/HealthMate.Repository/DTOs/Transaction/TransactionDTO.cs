using System.ComponentModel.DataAnnotations;

namespace HealthMate.Repository.DTOs.Transaction
{
    public class TransactionDTO
    {
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public int PackageId { get; set; }
        public int PaymentMethodId { get; set; }
        public string TransactionCode { get; set; } = null!;
        public decimal Amount { get; set; }
        public string Status { get; set; } = null!;
        public DateTime PurchasedAt { get; set; }
        public string PackageName { get; set; } = null!;
        public string PaymentMethodName { get; set; } = null!;
    }

    public class CreateTransactionRequest
    {
        [Required]
        public int PackageId { get; set; }
        
        [Required]
        public int PaymentMethodId { get; set; }
    }

    public class UpdateTransactionStatusRequest
    {
        [Required]
        [RegularExpression("^(Pending|Completed|Failed|Refunded)$", 
            ErrorMessage = "Status must be one of: Pending, Completed, Failed, Refunded")]
        public string Status { get; set; } = null!;
    }
} 