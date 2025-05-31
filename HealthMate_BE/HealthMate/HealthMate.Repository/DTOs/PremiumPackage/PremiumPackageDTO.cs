using System.ComponentModel.DataAnnotations;

namespace HealthMate.Repository.DTOs.PremiumPackage
{
    public class PremiumPackageDTO
    {
        public int PackageId { get; set; }
        public string PackageName { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int DurationDays { get; set; }
        public int ActiveSubscribers { get; set; }
    }

    public class CreatePremiumPackageRequest
    {
        [Required]
        [StringLength(100)]
        public string PackageName { get; set; } = null!;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be at least 1 day")]
        public int DurationDays { get; set; }
    }

    public class UpdatePremiumPackageRequest
    {
        [Required]
        [StringLength(100)]
        public string PackageName { get; set; } = null!;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be at least 1 day")]
        public int DurationDays { get; set; }
    }
} 