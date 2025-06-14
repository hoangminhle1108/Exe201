﻿using HealthMate.Repository.DTOs.Recipe;
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
            UpdatedAt = recipe.UpdatedAt
        };

    }
}