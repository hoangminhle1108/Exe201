using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.DTOs.Recipe
{
    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
    }
    
    // Thêm CategoryDTO riêng cho category operations
    public class RecipeCategoryDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
        public string? Description { get; set; }
        public int RecipeCount { get; set; }
    }
    
    // Thêm DTOs cho CRUD operations
    public class CreateRecipeCategoryRequest
    {
        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; } = null!;
        
        [StringLength(500)]
        public string? Description { get; set; }
    }
    
    public class UpdateRecipeCategoryRequest
    {
        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; } = null!;
        
        [StringLength(500)]
        public string? Description { get; set; }
    }
    
    public class RecipeDTO
    {
        public int RecipeId { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string Ingredients { get; set; } = null!;
        public string Instructions { get; set; } = null!;
        public int CookingTime { get; set; }
        public int Servings { get; set; }
        public int? Calories { get; set; }
        public string Difficulty { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public bool IsPremium { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int Likes { get; set; }

        public List<CategoryDTO> Categories { get; set; } = new();
    }
    public class CreateRecipeRequest
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string Ingredients { get; set; } = null!;
        public string Instructions { get; set; } = null!;
        public int CookingTime { get; set; }
        public int Servings { get; set; }
        public int? Calories { get; set; }
        public string Difficulty { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public int CreatedBy { get; set; } // UserId
    }

    // DTOs/Recipe/UpdateRecipeRequest.cs
    public class UpdateRecipeRequest
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string Ingredients { get; set; } = null!;
        public string Instructions { get; set; } = null!;
        public int CookingTime { get; set; }
        public int Servings { get; set; }
        public int? Calories { get; set; }
        public string Difficulty { get; set; } = null!;
        public string? ImageUrl { get; set; }
    }
}
