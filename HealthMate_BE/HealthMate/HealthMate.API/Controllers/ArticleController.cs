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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ArticleDTO>> CreateArticle(CreateArticleRequest request)
        {
            var article = await _articleService.CreateArticleAsync(request);
            return CreatedAtAction(nameof(GetArticleById), new { id = article.ArticleId }, article);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
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
    }
} 