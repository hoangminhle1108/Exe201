using HealthMate.Repository.DTOs.Recipe;
using HealthMate.Repository.Interface.Recipe;
using HealthMate.Services.Interface.Recipe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.Recipe
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _repo;
        public RecipeService(IRecipeRepository repo) => _repo = repo;

        public async Task<List<RecipeDTO>> GetAllRecipesAsync()
        {
            var recipes = await _repo.GetAllRecipesAsync();
            return recipes.Select(MapToDTO).ToList();
        }

        public async Task<RecipeDTO?> GetRecipeByIdAsync(int id)
        {
            var recipe = await _repo.GetRecipeByIdAsync(id);
            return recipe != null ? MapToDTO(recipe) : null;
        }

        
        public async Task<RecipeDTO> CreateRecipeAsync(CreateRecipeRequest request)
        {
            var recipe = new Repository.Models.Recipe
            {
                Title = request.Title,
                Description = request.Description,
                Ingredients = request.Ingredients,
                Instructions = request.Instructions,
                CookingTime = request.CookingTime,
                Servings = request.Servings,
                Calories = request.Calories,
                Difficulty = request.Difficulty,
                ImageUrl = request.ImageUrl,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = request.CreatedBy
            };

            var created = await _repo.CreateRecipeAsync(recipe);
            return MapToDTO(created);
        }

        public async Task<RecipeDTO?> UpdateRecipeAsync(int id, UpdateRecipeRequest request)
        {
            var recipe = await _repo.GetRecipeByIdAsync(id);
            if (recipe == null) return null;

            recipe.Title = request.Title;
            recipe.Description = request.Description;
            recipe.Ingredients = request.Ingredients;
            recipe.Instructions = request.Instructions;
            recipe.CookingTime = request.CookingTime;
            recipe.Servings = request.Servings;
            recipe.Calories = request.Calories;
            recipe.Difficulty = request.Difficulty;
            recipe.ImageUrl = request.ImageUrl;
            recipe.UpdatedAt = DateTime.UtcNow;

            var updated = await _repo.UpdateRecipeAsync(recipe);
            return updated != null ? MapToDTO(updated) : null;
        }
        
        // Implementation cho category operations
        public async Task<List<RecipeCategoryDTO>> GetAllRecipeCategoriesAsync()
        {
            var categories = await _repo.GetAllRecipeCategoriesAsync();
            return categories.Select(category => new RecipeCategoryDTO
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName,
                Description = category.Description,
                RecipeCount = category.Recipes?.Count ?? 0
            }).ToList();
        }

        public async Task<List<RecipeDTO>> GetRecipesByCategoryAsync(int categoryId)
        {
            var recipes = await _repo.GetRecipesByCategoryAsync(categoryId);
            return recipes.Select(MapToDTO).ToList();
        }
        
        // Implementation cho CRUD Recipe Categories
        public async Task<RecipeCategoryDTO?> GetRecipeCategoryByIdAsync(int categoryId)
        {
            var category = await _repo.GetRecipeCategoryByIdAsync(categoryId);
            return category != null ? new RecipeCategoryDTO
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName,
                Description = category.Description,
                RecipeCount = category.Recipes?.Count ?? 0
            } : null;
        }

        public async Task<RecipeCategoryDTO> CreateRecipeCategoryAsync(CreateRecipeCategoryRequest request)
        {
            var category = new Repository.Models.RecipeCategory
            {
                CategoryName = request.CategoryName,
                Description = request.Description
            };

            var created = await _repo.CreateRecipeCategoryAsync(category);
            return new RecipeCategoryDTO
            {
                CategoryId = created.CategoryId,
                CategoryName = created.CategoryName,
                Description = created.Description,
                RecipeCount = 0
            };
        }

        public async Task<RecipeCategoryDTO?> UpdateRecipeCategoryAsync(int categoryId, UpdateRecipeCategoryRequest request)
        {
            var category = new Repository.Models.RecipeCategory
            {
                CategoryId = categoryId,
                CategoryName = request.CategoryName,
                Description = request.Description
            };

            var updated = await _repo.UpdateRecipeCategoryAsync(category);
            if (updated == null)
                return null;

            return new RecipeCategoryDTO
            {
                CategoryId = updated.CategoryId,
                CategoryName = updated.CategoryName,
                Description = updated.Description,
                RecipeCount = updated.Recipes?.Count ?? 0
            };
        }

        public async Task<bool> DeleteRecipeCategoryAsync(int categoryId)
        {
            return await _repo.DeleteRecipeCategoryAsync(categoryId);
        }
        
        // Implementation cho Like/Unlike
        public async Task<bool> LikeRecipeAsync(int recipeId)
        {
            return await _repo.LikeRecipeAsync(recipeId);
        }

        public async Task<bool> UnlikeRecipeAsync(int recipeId)
        {
            return await _repo.UnlikeRecipeAsync(recipeId);
        }
        
        private static RecipeDTO MapToDTO(Repository.Models.Recipe recipe) => new RecipeDTO
        {
            RecipeId = recipe.RecipeId,
            Title = recipe.Title,
            Description = recipe.Description,
            Ingredients = recipe.Ingredients,
            Instructions = recipe.Instructions,
            CookingTime = recipe.CookingTime,
            Servings = recipe.Servings,
            Calories = recipe.Calories,
            Difficulty = recipe.Difficulty,
            ImageUrl = recipe.ImageUrl,
            CreatedAt = recipe.CreatedAt,
            UpdatedAt = recipe.UpdatedAt,
            Likes = recipe.Likes,
            Categories = recipe.Categories?.Select(c => new CategoryDTO
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName
            }).ToList() ?? new List<CategoryDTO>()
        };

        // The error is caused by calling .Select on a Task<List<Recipe>> instead of on the resulting List<Recipe>.
        // You must first await the Task to get the List, then call .Select on the result.
        // The correct implementation for SearchRecipesByTitleAsync is:

        public async Task<List<RecipeDTO>> SearchRecipesByTitleAsync(string title)
        {
            var recipes = await _repo.SearchRecipesByTitleAsync(title);
            return recipes.Select(MapToDTO).ToList();
        }

        public async Task<List<RecipeDTO>> GetMostLikedRecipesAsync(int count)
        {
           var recipes = await _repo.GetMostLikedRecipesAsync(count);
            return recipes.Select(MapToDTO).ToList();
        }

        public async Task<bool> DeleteRecipeAsync(int recipeId)
        {
            return await _repo.DeleteRecipeAsync(recipeId);
        }
    }
}