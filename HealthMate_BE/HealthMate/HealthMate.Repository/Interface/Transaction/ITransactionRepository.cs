using HealthMate.Repository.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Repository.Interface.Transaction
{
    public interface ITransactionRepository
    {
        Task<List<Models.Transaction>> GetAllByUserIdAsync(int userId);
        Task<Models.Transaction?> GetByIdAsync(int transactionId, int userId);
        Task<Models.Transaction?> GetByTransactionCodeAsync(string transactionCode);
        Task<Models.Transaction> CreateAsync(Models.Transaction transaction);
        Task<Models.Transaction?> UpdateStatusAsync(int transactionId, string status);
        Task<List<Models.Transaction>> GetPendingTransactionsAsync();
        Task<bool> IsTransactionCodeUniqueAsync(string transactionCode);
    }
} 