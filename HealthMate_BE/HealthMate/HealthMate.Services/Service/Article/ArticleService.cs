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
        
        // Implementation cho category operations
        public async Task<List<ArticleCategoryDTO>> GetAllArticleCategoriesAsync()
        {
            var tags = await _repo.GetAllArticleCategoriesAsync();
            return tags.Select(tag => new ArticleCategoryDTO
            {
                TagId = tag.TagId,
                TagName = tag.TagName,
                Description = tag.Description,
                ArticleCount = tag.ArticleTagMappings?.Count ?? 0
            }).ToList();
        }

        public async Task<List<ArticleDTO>> GetArticlesByCategoryAsync(int tagId)
        {
            var articles = await _repo.GetArticlesByCategoryAsync(tagId);
            return articles.Select(MapToDTO).ToList();
        }
        
        // Implementation cho CRUD Article Categories
        public async Task<ArticleCategoryDTO?> GetArticleCategoryByIdAsync(int tagId)
        {
            var tag = await _repo.GetArticleCategoryByIdAsync(tagId);
            return tag != null ? new ArticleCategoryDTO
            {
                TagId = tag.TagId,
                TagName = tag.TagName,
                Description = tag.Description,
                ArticleCount = tag.ArticleTagMappings?.Count ?? 0
            } : null;
        }

        public async Task<ArticleCategoryDTO> CreateArticleCategoryAsync(CreateArticleCategoryRequest request)
        {
            var tag = new Repository.Models.Tag
            {
                TagName = request.TagName,
                Description = request.Description,
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repo.CreateArticleCategoryAsync(tag);
            return new ArticleCategoryDTO
            {
                TagId = created.TagId,
                TagName = created.TagName,
                Description = created.Description,
                ArticleCount = 0
            };
        }

        public async Task<ArticleCategoryDTO?> UpdateArticleCategoryAsync(int tagId, UpdateArticleCategoryRequest request)
        {
            var tag = new Repository.Models.Tag
            {
                TagId = tagId,
                TagName = request.TagName,
                Description = request.Description
            };

            var updated = await _repo.UpdateArticleCategoryAsync(tag);
            if (updated == null)
                return null;

            return new ArticleCategoryDTO
            {
                TagId = updated.TagId,
                TagName = updated.TagName,
                Description = updated.Description,
                ArticleCount = updated.ArticleTagMappings?.Count ?? 0
            };
        }

        public async Task<bool> DeleteArticleCategoryAsync(int tagId)
        {
            return await _repo.DeleteArticleCategoryAsync(tagId);
        }

        // Implementation cho Like/Unlike
        public async Task<bool> LikeArticleAsync(int articleId)
        {
            return await _repo.LikeArticleAsync(articleId);
        }

        public async Task<bool> UnlikeArticleAsync(int articleId)
        {
            return await _repo.UnlikeArticleAsync(articleId);
        }

        // Implementation cho tìm kiếm và lấy bài viết phổ biến
        public async Task<List<ArticleDTO>> SearchArticlesByTitleAsync(string title)
        {
            var articles = await _repo.SearchArticlesByTitleAsync(title);
            return articles.Select(MapToDTO).ToList();
        }

        public async Task<List<ArticleDTO>> GetMostLikedArticlesAsync(int count)
        {
            var articles = await _repo.GetMostLikedArticlesAsync(count);
            return articles.Select(MapToDTO).ToList();
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
                LikesCount = article.Likes,
                Tags = article.ArticleTagMappings.Select(m => new TagDTO
                {
                    TagId = m.TagId,
                    TagName = m.Tag.TagName
                }).ToList()
            };
        }
    }
}