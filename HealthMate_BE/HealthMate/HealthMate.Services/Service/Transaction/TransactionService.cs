using HealthMate.Repository.DTOs.Transaction;
using HealthMate.Repository.Interface.Transaction;
using HealthMate.Repository.Interface.User;
using HealthMate.Services.Interface.Transaction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthMate.Services.Service.Transaction
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repo;
        private readonly IUserRepository _userRepo;
        private readonly Random _random = new Random();

        public TransactionService(ITransactionRepository repo, IUserRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        public async Task<List<TransactionDTO>> GetAllByUserIdAsync(int userId)
        {
            var transactions = await _repo.GetAllByUserIdAsync(userId);
            return transactions.Select(MapToDTO).ToList();
        }

        public async Task<TransactionDTO?> GetByIdAsync(int transactionId, int userId)
        {
            var transaction = await _repo.GetByIdAsync(transactionId, userId);
            return transaction != null ? MapToDTO(transaction) : null;
        }

        public async Task<TransactionDTO> CreateAsync(int userId, CreateTransactionRequest request)
        {
            // Validate user exists
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException("User not found", nameof(userId));
            }

            // Generate unique transaction code
            string transactionCode;
            do
            {
                transactionCode = GenerateTransactionCode();
            } while (!await _repo.IsTransactionCodeUniqueAsync(transactionCode));

            // Create transaction
            var transaction = new Repository.Models.Transaction
            {
                UserId = userId,
                PackageId = request.PackageId,
                PaymentMethodId = request.PaymentMethodId,
                TransactionCode = transactionCode,
                Status = "Pending",
                PurchasedAt = DateTime.UtcNow
            };

            try
            {
                var created = await _repo.CreateAsync(transaction);
                return MapToDTO(created);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to create transaction", ex);
            }
        }

        public async Task<TransactionDTO?> UpdateStatusAsync(int transactionId, UpdateTransactionStatusRequest request)
        {
            var transaction = await _repo.UpdateStatusAsync(transactionId, request.Status);
            if (transaction == null) return null;

            // If transaction is completed, update user's premium expiry
            if (request.Status == "Completed")
            {
                var user = await _userRepo.GetByIdAsync(transaction.UserId);
                if (user != null)
                {
                    // Update user's premium expiry based on package
                    // This logic should be implemented based on your business rules
                    // For example: user.PremiumExpiry = DateTime.UtcNow.AddMonths(1);
                }
            }

            return MapToDTO(transaction);
        }

        public async Task<List<TransactionDTO>> GetPendingTransactionsAsync()
        {
            var transactions = await _repo.GetPendingTransactionsAsync();
            return transactions.Select(MapToDTO).ToList();
        }

        public async Task<TransactionDTO?> GetByTransactionCodeAsync(string transactionCode)
        {
            var transaction = await _repo.GetByTransactionCodeAsync(transactionCode);
            return transaction != null ? MapToDTO(transaction) : null;
        }

        private static TransactionDTO MapToDTO(Repository.Models.Transaction transaction)
        {
            return new TransactionDTO
            {
                TransactionId = transaction.TransactionId,
                UserId = transaction.UserId,
                PackageId = transaction.PackageId,
                PaymentMethodId = transaction.PaymentMethodId,
                TransactionCode = transaction.TransactionCode,
                Amount = transaction.Amount,
                Status = transaction.Status,
                PurchasedAt = transaction.PurchasedAt,
                PackageName = transaction.Package?.PackageName ?? "Unknown",
                PaymentMethodName = transaction.PaymentMethod?.MethodName ?? "Unknown"
            };
        }

        private string GenerateTransactionCode()
        {
            // Generate a unique transaction code (e.g., TRX-2024-XXXXX)
            return $"TRX-{DateTime.UtcNow:yyyy}-{_random.Next(10000, 99999)}";
        }
    }
} 