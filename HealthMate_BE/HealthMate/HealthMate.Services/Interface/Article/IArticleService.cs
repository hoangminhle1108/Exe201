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
    }
} 