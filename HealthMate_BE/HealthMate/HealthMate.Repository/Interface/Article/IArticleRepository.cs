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
    }
} 