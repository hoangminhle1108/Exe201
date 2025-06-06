using HealthMate.Repository.DTOs.Transaction;
using HealthMate.Repository.Interface.Transaction;
using HealthMate.Repository.Interface.User;
using HealthMate.Services.Helpers;
using HealthMate.Services.Interface.Transaction;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public TransactionService(ITransactionRepository repo, IUserRepository userRepo, IConfiguration configuration)
        {
            _repo = repo;
            _userRepo = userRepo;
            _configuration = configuration;
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

        public async Task<string> CreateVNPayPaymentUrl(TransactionDTO transaction, HttpContext httpContext)
        {
            var vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            var returnUrl = "https://yourdomain.com/api/payment/vnpay-return";
            var tmnCode = _configuration["VNPay:TmnCode"];
            var hashSecret = _configuration["VNPay:HashSecret"];

            var vnPay = new VnPayLibrary();
            vnPay.AddRequestData("vnp_Version", "2.1.0");
            vnPay.AddRequestData("vnp_Command", "pay");
            vnPay.AddRequestData("vnp_TmnCode", tmnCode);
            vnPay.AddRequestData("vnp_Amount", ((int)(transaction.Amount * 100)).ToString());
            vnPay.AddRequestData("vnp_CreateDate", DateTime.UtcNow.ToString("yyyyMMddHHmmss"));
            vnPay.AddRequestData("vnp_CurrCode", "VND");
            vnPay.AddRequestData("vnp_IpAddr", httpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1");
            vnPay.AddRequestData("vnp_Locale", "vn");
            vnPay.AddRequestData("vnp_OrderInfo", $"Payment for transaction {transaction.TransactionCode}");
            vnPay.AddRequestData("vnp_OrderType", "other");
            vnPay.AddRequestData("vnp_ReturnUrl", returnUrl);
            vnPay.AddRequestData("vnp_TxnRef", transaction.TransactionCode);

            return vnPay.CreateRequestUrl(vnp_Url, hashSecret);
        }

    }
} 