using HealthMate.Repository.DTOs.Recipe;
using HealthMate.Services.Interface.Recipe;
using HealthMate.Services.Service.Recipe;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthMate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeService _service;
        public RecipeController(IRecipeService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<List<RecipeDTO>>> GetAll()
        {
            var result = await _service.GetAllRecipesAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeDTO>> GetById(int id)
        {
            var recipe = await _service.GetRecipeByIdAsync(id);
            return recipe == null ? NotFound() : Ok(recipe);
        }
        [HttpPost]
        public async Task<ActionResult<RecipeDTO>> CreateRecipe(CreateRecipeRequest request)
        {
            var recipe = await _service.CreateRecipeAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = recipe.RecipeId }, recipe);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<RecipeDTO>> UpdateRecipe(int id, UpdateRecipeRequest request)
        {
            var recipe = await _service.UpdateRecipeAsync(id, request);
            if (recipe == null)
                return NotFound();

            return Ok(recipe);
        }
    }
}
