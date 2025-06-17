using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthMate.Repository.Interface.Recipe
{
    public interface IRecipeRepository
    {
        Task<List<Models.Recipe>> GetAllRecipesAsync();
        Task<Models.Recipe?> GetRecipeByIdAsync(int id);
        Task<Models.Recipe> CreateRecipeAsync(Models.Recipe recipe);
        Task<Models.Recipe?> UpdateRecipeAsync(Models.Recipe recipe);
        
        // Thêm các method mới cho category operations
        Task<List<Models.RecipeCategory>> GetAllRecipeCategoriesAsync();
        Task<List<Models.Recipe>> GetRecipesByCategoryAsync(int categoryId);
        
        // Thêm CRUD methods cho Recipe Categories
        Task<Models.RecipeCategory?> GetRecipeCategoryByIdAsync(int categoryId);
        Task<Models.RecipeCategory> CreateRecipeCategoryAsync(Models.RecipeCategory category);
        Task<Models.RecipeCategory?> UpdateRecipeCategoryAsync(Models.RecipeCategory category);
        Task<bool> DeleteRecipeCategoryAsync(int categoryId);
        
        // Thêm methods cho Like/Unlike
        Task<bool> LikeRecipeAsync(int recipeId);
        Task<bool> UnlikeRecipeAsync(int recipeId);
    }
}
