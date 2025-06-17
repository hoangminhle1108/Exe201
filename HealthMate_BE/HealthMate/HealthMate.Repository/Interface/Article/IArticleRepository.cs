using HealthMate.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Repository.Interface.Article
{
    public interface IArticleRepository
    {
        Task<List<Models.Article>> GetAllArticlesAsync();
        Task<Models.Article?> GetArticleByIdAsync(int id);
        Task<Models.Article> CreateArticleAsync(Models.Article article);
        Task<Models.Article?> UpdateArticleAsync(Models.Article article);
        Task<bool> DeleteArticleAsync(int id);
        
        // Thêm các method mới cho category operations
        Task<List<Models.Tag>> GetAllArticleCategoriesAsync();
        Task<List<Models.Article>> GetArticlesByCategoryAsync(int tagId);
        
        // Thêm CRUD methods cho Article Categories
        Task<Models.Tag?> GetArticleCategoryByIdAsync(int tagId);
        Task<Models.Tag> CreateArticleCategoryAsync(Models.Tag tag);
        Task<Models.Tag?> UpdateArticleCategoryAsync(Models.Tag tag);
        Task<bool> DeleteArticleCategoryAsync(int tagId);
        
        // Thêm methods cho Like/Unlike
        Task<bool> LikeArticleAsync(int articleId);
        Task<bool> UnlikeArticleAsync(int articleId);
    }
} 