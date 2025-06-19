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
        
        // Implementation cho category operations
        public async Task<List<Models.RecipeCategory>> GetAllRecipeCategoriesAsync()
        {
            return await _context.RecipeCategories
                .Include(rc => rc.Recipes)
                .OrderBy(rc => rc.CategoryName)
                .ToListAsync();
        }

        public async Task<List<Models.Recipe>> GetRecipesByCategoryAsync(int categoryId)
        {
            return await _context.Recipes
                .Include(r => r.Categories)
                .Where(r => r.Categories.Any(c => c.CategoryId == categoryId))
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }
        
        // Implementation cho CRUD Recipe Categories
        public async Task<Models.RecipeCategory?> GetRecipeCategoryByIdAsync(int categoryId)
        {
            return await _context.RecipeCategories
                .Include(rc => rc.Recipes)
                .FirstOrDefaultAsync(rc => rc.CategoryId == categoryId);
        }

        public async Task<Models.RecipeCategory> CreateRecipeCategoryAsync(Models.RecipeCategory category)
        {
            _context.RecipeCategories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Models.RecipeCategory?> UpdateRecipeCategoryAsync(Models.RecipeCategory category)
        {
            var existingCategory = await _context.RecipeCategories
                .FirstOrDefaultAsync(rc => rc.CategoryId == category.CategoryId);

            if (existingCategory == null)
                return null;

            existingCategory.CategoryName = category.CategoryName;
            existingCategory.Description = category.Description;

            await _context.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<bool> DeleteRecipeCategoryAsync(int categoryId)
        {
            var category = await _context.RecipeCategories
                .Include(rc => rc.Recipes)
                .FirstOrDefaultAsync(rc => rc.CategoryId == categoryId);

            if (category == null)
                return false;

            // Kiểm tra xem category có được sử dụng trong recipes không
            if (category.Recipes.Any())
                return false; // Không thể xóa category đang được sử dụng

            _context.RecipeCategories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
        
        // Implementation cho Like/Unlike
        public async Task<bool> LikeRecipeAsync(int recipeId)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(r => r.RecipeId == recipeId);
            if (recipe == null) return false;
            recipe.Likes++;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnlikeRecipeAsync(int recipeId)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(r => r.RecipeId == recipeId);
            if (recipe == null) return false;
            if (recipe.Likes > 0) recipe.Likes--;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Models.Recipe>> SearchRecipesByTitleAsync(string title)
        {
            return await _context.Recipes
                .Include(r => r.Categories)
                .Where(r => r.Title.Contains(title))
                .ToListAsync();
        }

        public async Task<List<Models.Recipe>> GetMostLikedRecipesAsync(int count)
        {
            return await _context.Recipes
                .OrderByDescending(r => r.Likes)
                .Take(count)
                .Include(r => r.Categories)
                .ToListAsync();
        }
    }
}
