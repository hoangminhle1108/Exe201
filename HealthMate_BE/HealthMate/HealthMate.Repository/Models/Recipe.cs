using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class Recipe
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

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int CreatedBy { get; set; }

    public int Likes { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<RecipeCategory> Categories { get; set; } = new List<RecipeCategory>();
}
