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
    }
}
