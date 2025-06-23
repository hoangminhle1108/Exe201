using HealthMate.Repository.DTOs.Transaction;
using HealthMate.Repository.Interface.Transaction;
using HealthMate.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Repository.Repository.Transaction
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly NutritionAppContext _ctx;
        public TransactionRepository(NutritionAppContext ctx) => _ctx = ctx;

        public async Task<List<Models.Transaction>> GetAllByUserIdAsync(int userId)
        {
            return await _ctx.Transactions
                .Include(t => t.Package)
                .Include(t => t.PaymentMethod)
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.PurchasedAt)
                .ToListAsync();
        }

        public async Task<Models.Transaction?> GetByIdAsync(int transactionId, int userId)
        {
            return await _ctx.Transactions
                .Include(t => t.Package)
                .Include(t => t.PaymentMethod)
                .FirstOrDefaultAsync(t => t.TransactionId == transactionId && t.UserId == userId);
        }

        public async Task<Models.Transaction?> GetByTransactionCodeAsync(string transactionCode)
        {
            return await _ctx.Transactions
                .Include(t => t.Package)
                .Include(t => t.PaymentMethod)
                .FirstOrDefaultAsync(t => t.TransactionCode == transactionCode);
        }

        public async Task<Models.Transaction> CreateAsync(Models.Transaction transaction)
        {
            _ctx.Transactions.Add(transaction);
            await _ctx.SaveChangesAsync();
            return transaction;
        }

        public async Task<Models.Transaction?> UpdateStatusAsync(int transactionId, string status)
        {
            var transaction = await _ctx.Transactions
                .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
            
            if (transaction == null) return null;

            transaction.Status = status;
            await _ctx.SaveChangesAsync();
            return transaction;
        }

        public async Task<List<Models.Transaction>> GetPendingTransactionsAsync()
        {
            return await _ctx.Transactions
                .Include(t => t.Package)
                .Include(t => t.PaymentMethod)
                .Where(t => t.Status == "Pending")
                .OrderBy(t => t.PurchasedAt)
                .ToListAsync();
        }

        public async Task<bool> IsTransactionCodeUniqueAsync(string transactionCode)
        {
            return !await _ctx.Transactions
                .AnyAsync(t => t.TransactionCode == transactionCode);
        }

        public async Task<List<Models.Transaction>> GetAllTransactionAsync()
        {
            return await _ctx.Transactions
                .Include(t => t.Package)
                .Include(t => t.PaymentMethod)
                .OrderByDescending(t => t.PurchasedAt)
                .ToListAsync();
        }

        public async Task<Models.Transaction?> GetTransactionByIdAsync(int transactionId)
        {
            return await _ctx.Transactions
                .Include(t => t.Package)
                .Include(t => t.PaymentMethod)
                .FirstOrDefaultAsync(t => t.TransactionId == transactionId);
        }

        public async Task<TransactionDTONew> UpdateTransactionAsync(Models.Transaction transaction)
        {
            var existing = _ctx.Transactions
                .FirstOrDefault(t => t.TransactionId == transaction.TransactionId);
            if (existing == null) throw new InvalidOperationException("Transaction not found");
            existing.Status = transaction.Status;
            existing.PurchasedAt = transaction.PurchasedAt;
            existing.ExpiredDate = transaction.ExpiredDate;
            await _ctx.SaveChangesAsync();
            return new TransactionDTONew
            {
                TransactionId = existing.TransactionId,
                UserId = existing.UserId,
                FullName = existing.User.FullName,
                Email = existing.User.Email,
                PackagePrice = existing.Package.Price,
                PackageName = existing.Package.PackageName,
                Status = existing.Status,
                CreatedDate = (DateTime)existing.CreatedDate,
                PaymentDate = existing.PurchasedAt,
                ExpiryDate = existing.ExpiredDate
            };
        }
    }
} 