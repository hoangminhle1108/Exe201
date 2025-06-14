using HealthMate.Repository.Interface.Recipe;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.Repository.Recipe
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly NutritionAppContext _context;
        public RecipeRepository(NutritionAppContext context) => _context = context;

        public async Task<List<Models.Recipe>> GetAllRecipesAsync()
        {
            return await _context.Recipes
                .Include(r => r.Categories) 
                .ToListAsync();
        }

        public async Task<Models.Recipe?> GetRecipeByIdAsync(int id)
        {
            return await _context.Recipes
                .Include(r => r.Categories)
                .FirstOrDefaultAsync(r => r.RecipeId == id);
        }
        public async Task<Models.Recipe> CreateRecipeAsync(Models.Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return recipe;
        }
        public async Task<Models.Recipe?> UpdateRecipeAsync(Models.Recipe recipe)
        {
            var existing = await _context.Recipes.FindAsync(recipe.RecipeId);
            if (existing == null) return null;

            _context.Entry(existing).CurrentValues.SetValues(recipe);
            existing.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return existing;
        }
    }
}
