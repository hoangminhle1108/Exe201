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
    }
}
