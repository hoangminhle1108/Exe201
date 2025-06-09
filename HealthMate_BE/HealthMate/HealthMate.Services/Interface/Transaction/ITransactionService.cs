using HealthMate.Repository.DTOs.Transaction;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthMate.Services.Interface.Transaction
{
    public interface ITransactionService
    {
        Task<List<TransactionDTO>> GetAllByUserIdAsync(int userId);
        Task<TransactionDTO?> GetByIdAsync(int transactionId, int userId);
        Task<TransactionDTO> CreateAsync(int userId, CreateTransactionRequest request);
        Task<TransactionDTO?> UpdateStatusAsync(int transactionId, UpdateTransactionStatusRequest request);
        Task<List<TransactionDTO>> GetPendingTransactionsAsync();
        Task<TransactionDTO?> GetByTransactionCodeAsync(string transactionCode);
        Task<string> CreateVNPayPaymentUrl(TransactionDTO dto, HttpContext httpContext);
    }
} 