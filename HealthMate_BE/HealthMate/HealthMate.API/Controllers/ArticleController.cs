using HealthMate.Repository.DTOs.Article;
using HealthMate.Services.Interface.Article;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ArticleDTO>>> GetAllArticles()
        {
            var articles = await _articleService.GetAllArticlesAsync();
            return Ok(articles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleDTO>> GetArticleById(int id)
        {
            var article = await _articleService.GetArticleByIdAsync(id);
            if (article == null)
                return NotFound();

            return Ok(article);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ArticleDTO>> CreateArticle(CreateArticleRequest request)
        {
            var article = await _articleService.CreateArticleAsync(request);
            return CreatedAtAction(nameof(GetArticleById), new { id = article.ArticleId }, article);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ArticleDTO>> UpdateArticle(int id, UpdateArticleRequest request)
        {
            var article = await _articleService.UpdateArticleAsync(id, request);
            if (article == null)
                return NotFound();

            return Ok(article);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            var result = await _articleService.DeleteArticleAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
        
        // Thêm các endpoint mới cho category operations
        [HttpGet("categories")]
        public async Task<ActionResult<List<ArticleCategoryDTO>>> GetAllArticleCategories()
        {
            var categories = await _articleService.GetAllArticleCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("categories/{tagId}/articles")]
        public async Task<ActionResult<List<ArticleDTO>>> GetArticlesByCategory(int tagId)
        {
            var articles = await _articleService.GetArticlesByCategoryAsync(tagId);
            return Ok(articles);
        }
        
        // Thêm CRUD endpoints cho Article Categories
        [HttpGet("categories/{tagId}")]
        public async Task<ActionResult<ArticleCategoryDTO>> GetArticleCategoryById(int tagId)
        {
            var category = await _articleService.GetArticleCategoryByIdAsync(tagId);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost("categories")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ArticleCategoryDTO>> CreateArticleCategory(CreateArticleCategoryRequest request)
        {
            var category = await _articleService.CreateArticleCategoryAsync(request);
            return CreatedAtAction(nameof(GetArticleCategoryById), new { tagId = category.TagId }, category);
        }

        [HttpPut("categories/{tagId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ArticleCategoryDTO>> UpdateArticleCategory(int tagId, UpdateArticleCategoryRequest request)
        {
            var category = await _articleService.UpdateArticleCategoryAsync(tagId, request);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpDelete("categories/{tagId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteArticleCategory(int tagId)
        {
            var result = await _articleService.DeleteArticleCategoryAsync(tagId);
            if (!result)
                return NotFound();

            return NoContent();
        }

        // Thêm endpoints cho Like/Unlike
        [HttpPost("{id}/like")]
        public async Task<ActionResult> LikeArticle(int id)
        {
            var result = await _articleService.LikeArticleAsync(id);
            if (!result) return NotFound();
            return Ok();
        }

        [HttpPost("{id}/unlike")]
        public async Task<ActionResult> UnlikeArticle(int id)
        {
            var result = await _articleService.UnlikeArticleAsync(id);
            if (!result) return NotFound();
            return Ok();
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<ArticleDTO>>> SearchArticles([FromQuery] string title)
        {
            var articles = await _articleService.SearchArticlesByTitleAsync(title);
            return Ok(articles);
        }

        [HttpGet("popular")]
        public async Task<ActionResult<List<ArticleDTO>>> GetPopularArticles()
        {
            var articles = await _articleService.GetMostLikedArticlesAsync(5);
            return Ok(articles);
        }
    }
}