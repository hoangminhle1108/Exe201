using HealthMate.Repository.DTOs.Article;
using HealthMate.Repository.Interface.Article;
using HealthMate.Repository.Models;
using HealthMate.Services.Interface.Article;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.Article
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _repo;

        public ArticleService(IArticleRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<ArticleDTO>> GetAllArticlesAsync()
        {
            var articles = await _repo.GetAllArticlesAsync();
            return articles.Select(MapToDTO).ToList();
        }

        public async Task<ArticleDTO?> GetArticleByIdAsync(int id)
        {
            var article = await _repo.GetArticleByIdAsync(id);
            return article != null ? MapToDTO(article) : null;
        }

        public async Task<ArticleDTO> CreateArticleAsync(CreateArticleRequest request)
        {
            var article = new Repository.Models.Article
            {
                Title = request.Title,
                Content = request.Content,
                Author = request.Author,
                PublishedAt = DateTime.UtcNow
            };

            var createdArticle = await _repo.CreateArticleAsync(article);
            return MapToDTO(createdArticle);
        }

        public async Task<ArticleDTO?> UpdateArticleAsync(int id, UpdateArticleRequest request)
        {
            var existingArticle = await _repo.GetArticleByIdAsync(id);
            if (existingArticle == null)
                return null;

            existingArticle.Title = request.Title;
            existingArticle.Content = request.Content;
            existingArticle.Author = request.Author;
            existingArticle.UpdatedAt = DateTime.UtcNow;

            var updatedArticle = await _repo.UpdateArticleAsync(existingArticle);
            return updatedArticle != null ? MapToDTO(updatedArticle) : null;
        }

        public async Task<bool> DeleteArticleAsync(int id)
        {
            return await _repo.DeleteArticleAsync(id);
        }

        private static ArticleDTO MapToDTO(Repository.Models.Article article)
        {
            return new ArticleDTO
            {
                ArticleId = article.ArticleId,
                Title = article.Title,
                Content = article.Content,
                Author = article.Author,
                PublishedAt = article.PublishedAt,
                UpdatedAt = article.UpdatedAt
            };
        }
    }
} 