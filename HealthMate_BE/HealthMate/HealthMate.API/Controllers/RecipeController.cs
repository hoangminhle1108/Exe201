using HealthMate.Repository.DTOs.Recipe;
using HealthMate.Services.Interface.Recipe;
using HealthMate.Services.Service.Recipe;
using Microsoft.AspNetCore.Authorization;
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
        
        // Thêm các endpoint mới cho category operations
        [HttpGet("categories")]
        public async Task<ActionResult<List<RecipeCategoryDTO>>> GetAllRecipeCategories()
        {
            var categories = await _service.GetAllRecipeCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("categories/{categoryId}/recipes")]
        public async Task<ActionResult<List<RecipeDTO>>> GetRecipesByCategory(int categoryId)
        {
            var recipes = await _service.GetRecipesByCategoryAsync(categoryId);
            return Ok(recipes);
        }
        
        // Thêm CRUD endpoints cho Recipe Categories
        [HttpGet("categories/{categoryId}")]
        public async Task<ActionResult<RecipeCategoryDTO>> GetRecipeCategoryById(int categoryId)
        {
            var category = await _service.GetRecipeCategoryByIdAsync(categoryId);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost("categories")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<RecipeCategoryDTO>> CreateRecipeCategory(CreateRecipeCategoryRequest request)
        {
            var category = await _service.CreateRecipeCategoryAsync(request);
            return CreatedAtAction(nameof(GetRecipeCategoryById), new { categoryId = category.CategoryId }, category);
        }

        [HttpPut("categories/{categoryId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<RecipeCategoryDTO>> UpdateRecipeCategory(int categoryId, UpdateRecipeCategoryRequest request)
        {
            var category = await _service.UpdateRecipeCategoryAsync(categoryId, request);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpDelete("categories/{categoryId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteRecipeCategory(int categoryId)
        {
            var result = await _service.DeleteRecipeCategoryAsync(categoryId);
            if (!result)
                return NotFound();

            return NoContent();
        }
        
        // Thêm endpoints cho Like/Unlike
        [HttpPost("{id}/like")]
        public async Task<ActionResult> LikeRecipe(int id)
        {
            var result = await _service.LikeRecipeAsync(id);
            if (!result) return NotFound();
            return Ok();
        }

        [HttpPost("{id}/unlike")]
        public async Task<ActionResult> UnlikeRecipe(int id)
        {
            var result = await _service.UnlikeRecipeAsync(id);
            if (!result) return NotFound();
            return Ok();
        }
    }
}
