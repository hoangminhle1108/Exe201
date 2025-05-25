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
                .OrderByDescending(a => a.PublishedAt)
                .ToListAsync();
        }

        public async Task<Models.Article?> GetArticleByIdAsync(int id)
        {
            return await _ctx.Articles
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
    }
} 