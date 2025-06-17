using HealthMate.Repository.Base;
using HealthMate.Repository.Interface.Article;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Repository.Repository.Article
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly NutritionAppContext _ctx;
        public ArticleRepository(NutritionAppContext ctx) => _ctx = ctx;

        public async Task<List<Models.Article>> GetAllArticlesAsync()
        {
            return await _ctx.Articles
                .Include(a=> a.ArticleTagMappings).ThenInclude(a=> a.Tag)
                .OrderByDescending(a => a.PublishedAt)
                .ToListAsync();
        }

        public async Task<Models.Article?> GetArticleByIdAsync(int id)
        {
            return await _ctx.Articles
                .Include(a => a.ArticleTagMappings).ThenInclude(a => a.Tag)
                .FirstOrDefaultAsync(a => a.ArticleId == id);
        }

        public async Task<Models.Article> CreateArticleAsync(Models.Article article)
        {
            article.PublishedAt = DateTime.UtcNow;
            _ctx.Articles.Add(article);
            await _ctx.SaveChangesAsync();
            return article;
        }

        public async Task<Models.Article?> UpdateArticleAsync(Models.Article article)
        {
            var existingArticle = await _ctx.Articles
                .FirstOrDefaultAsync(a => a.ArticleId == article.ArticleId);

            if (existingArticle == null)
                return null;

            existingArticle.Title = article.Title;
            existingArticle.Content = article.Content;
            existingArticle.Author = article.Author;
            existingArticle.ImageUrl = article.ImageUrl;
            existingArticle.UpdatedAt = DateTime.UtcNow;

            await _ctx.SaveChangesAsync();
            return existingArticle;
        }

        public async Task<bool> DeleteArticleAsync(int id)
        {
            var article = await _ctx.Articles
                .FirstOrDefaultAsync(a => a.ArticleId == id);

            if (article == null)
                return false;

            _ctx.Articles.Remove(article);
            await _ctx.SaveChangesAsync();
            return true;
        }
        
        // Implementation cho category operations
        public async Task<List<Models.Tag>> GetAllArticleCategoriesAsync()
        {
            return await _ctx.Tags
                .Include(t => t.ArticleTagMappings)
                .OrderBy(t => t.TagName)
                .ToListAsync();
        }

        public async Task<List<Models.Article>> GetArticlesByCategoryAsync(int tagId)
        {
            return await _ctx.Articles
                .Include(a => a.ArticleTagMappings).ThenInclude(a => a.Tag)
                .Where(a => a.ArticleTagMappings.Any(atm => atm.TagId == tagId))
                .OrderByDescending(a => a.PublishedAt)
                .ToListAsync();
        }
        
        // Implementation cho CRUD Article Categories
        public async Task<Models.Tag?> GetArticleCategoryByIdAsync(int tagId)
        {
            return await _ctx.Tags
                .Include(t => t.ArticleTagMappings)
                .FirstOrDefaultAsync(t => t.TagId == tagId);
        }

        public async Task<Models.Tag> CreateArticleCategoryAsync(Models.Tag tag)
        {
            tag.CreatedAt = DateTime.UtcNow;
            _ctx.Tags.Add(tag);
            await _ctx.SaveChangesAsync();
            return tag;
        }

        public async Task<Models.Tag?> UpdateArticleCategoryAsync(Models.Tag tag)
        {
            var existingTag = await _ctx.Tags
                .FirstOrDefaultAsync(t => t.TagId == tag.TagId);

            if (existingTag == null)
                return null;

            existingTag.TagName = tag.TagName;
            existingTag.Description = tag.Description;
            existingTag.UpdatedAt = DateTime.UtcNow;

            await _ctx.SaveChangesAsync();
            return existingTag;
        }

        public async Task<bool> DeleteArticleCategoryAsync(int tagId)
        {
            var tag = await _ctx.Tags
                .Include(t => t.ArticleTagMappings)
                .FirstOrDefaultAsync(t => t.TagId == tagId);

            if (tag == null)
                return false;

            // Kiểm tra xem tag có được sử dụng trong articles không
            if (tag.ArticleTagMappings.Any())
                return false; // Không thể xóa tag đang được sử dụng

            _ctx.Tags.Remove(tag);
            await _ctx.SaveChangesAsync();
            return true;
        }
        
        // Implementation cho Like/Unlike
        public async Task<bool> LikeArticleAsync(int articleId)
        {
            var article = await _ctx.Articles.FirstOrDefaultAsync(a => a.ArticleId == articleId);
            if (article == null) return false;
            article.Likes++;
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnlikeArticleAsync(int articleId)
        {
            var article = await _ctx.Articles.FirstOrDefaultAsync(a => a.ArticleId == articleId);
            if (article == null) return false;
            if (article.Likes > 0) article.Likes--;
            await _ctx.SaveChangesAsync();
            return true;
        }

        // Implementation cho tìm kiếm và lấy bài viết phổ biến
        public async Task<List<Models.Article>> SearchArticlesByTitleAsync(string title)
        {
            return await _ctx.Articles
                .Include(a => a.ArticleTagMappings).ThenInclude(a => a.Tag)
                .Where(a => a.Title.Contains(title))
                .OrderByDescending(a => a.PublishedAt)
                .ToListAsync();
        }

        public async Task<List<Models.Article>> GetMostLikedArticlesAsync(int count)
        {
            return await _ctx.Articles
                .Include(a => a.ArticleTagMappings).ThenInclude(a => a.Tag)
                .OrderByDescending(a => a.Likes)
                .Take(count)
                .ToListAsync();
        }
    }
}