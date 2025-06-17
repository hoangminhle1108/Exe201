using HealthMate.Repository.DTOs.Article;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.Article
{
    public interface IArticleService
    {
        Task<List<ArticleDTO>> GetAllArticlesAsync();
        Task<ArticleDTO?> GetArticleByIdAsync(int id);
        Task<ArticleDTO> CreateArticleAsync(CreateArticleRequest request);
        Task<ArticleDTO?> UpdateArticleAsync(int id, UpdateArticleRequest request);
        Task<bool> DeleteArticleAsync(int id);
        
        // Thêm các method mới cho category operations
        Task<List<ArticleCategoryDTO>> GetAllArticleCategoriesAsync();
        Task<List<ArticleDTO>> GetArticlesByCategoryAsync(int tagId);
        
        // Thêm CRUD methods cho Article Categories
        Task<ArticleCategoryDTO?> GetArticleCategoryByIdAsync(int tagId);
        Task<ArticleCategoryDTO> CreateArticleCategoryAsync(CreateArticleCategoryRequest request);
        Task<ArticleCategoryDTO?> UpdateArticleCategoryAsync(int tagId, UpdateArticleCategoryRequest request);
        Task<bool> DeleteArticleCategoryAsync(int tagId);
        
        // Thêm methods cho Like/Unlike
        Task<bool> LikeArticleAsync(int articleId);
        Task<bool> UnlikeArticleAsync(int articleId);
    }
} 