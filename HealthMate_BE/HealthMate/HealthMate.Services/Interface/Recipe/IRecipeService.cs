using HealthMate.Repository.DTOs.Recipe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.Recipe
{
    public interface IRecipeService
    {
        Task<List<RecipeDTO>> GetAllRecipesAsync();
        Task<RecipeDTO?> GetRecipeByIdAsync(int id);

        Task<RecipeDTO> CreateRecipeAsync(CreateRecipeRequest request);
        Task<RecipeDTO?> UpdateRecipeAsync(int id, UpdateRecipeRequest request);
        
        // Thêm các method mới cho category operations
        Task<List<RecipeCategoryDTO>> GetAllRecipeCategoriesAsync();
        Task<List<RecipeDTO>> GetRecipesByCategoryAsync(int categoryId);
        
        // Thêm CRUD methods cho Recipe Categories
        Task<RecipeCategoryDTO?> GetRecipeCategoryByIdAsync(int categoryId);
        Task<RecipeCategoryDTO> CreateRecipeCategoryAsync(CreateRecipeCategoryRequest request);
        Task<RecipeCategoryDTO?> UpdateRecipeCategoryAsync(int categoryId, UpdateRecipeCategoryRequest request);
        Task<bool> DeleteRecipeCategoryAsync(int categoryId);
        
        // Thêm methods cho Like/Unlike
        Task<bool> LikeRecipeAsync(int recipeId);
        Task<bool> UnlikeRecipeAsync(int recipeId);
    }
}
