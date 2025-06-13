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
                ImageUrl = request.ImageUrl,
                PublishedAt = DateTime.UtcNow
            };

            // Add tags
            foreach (var tagId in request.TagIds.Distinct())
            {
                article.ArticleTagMappings.Add(new ArticleTagMapping
                {
                    TagId = tagId,
                });
            }

            var created = await _repo.CreateArticleAsync(article);
            return MapToDTO(created);
        }

        public async Task<ArticleDTO?> UpdateArticleAsync(int id, UpdateArticleRequest request)
        {
            var article = await _repo.GetArticleByIdAsync(id);
            if (article == null)
                return null;

            article.Title = request.Title;
            article.Content = request.Content;
            article.Author = request.Author;
            article.ImageUrl = request.ImageUrl;
            article.UpdatedAt = DateTime.UtcNow;

            // Clear old tags
            article.ArticleTagMappings.Clear();

            // Add new tag mappings
            foreach (var tagId in request.TagIds.Distinct())
            {
                article.ArticleTagMappings.Add(new ArticleTagMapping
                {
                    ArticleId = article.ArticleId,
                    TagId = tagId,
                    CreatedAt = DateTime.UtcNow
                });
            }

            var updated = await _repo.UpdateArticleAsync(article);
            return updated != null ? MapToDTO(updated) : null;
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
                UpdatedAt = article.UpdatedAt,
                ImageUrl = article.ImageUrl,
                Tags = article.ArticleTagMappings.Select(m => new TagDTO
                {
                    TagId = m.TagId,
                    TagName = m.Tag.TagName
                }).ToList()
            };
        }
    }
} 