using System;
using System.Collections.Generic;

namespace HealthMate.Repository.Models;

public partial class RecipeCategory
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
