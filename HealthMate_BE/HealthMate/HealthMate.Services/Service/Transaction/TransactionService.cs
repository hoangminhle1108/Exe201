using HealthMate.Repository.DTOs.Transaction;
using HealthMate.Repository.Interface.PremiumPackage;
using HealthMate.Repository.Interface.Transaction;
using HealthMate.Repository.Interface.User;
using HealthMate.Repository.Models;
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
        private readonly IPremiumPackageRepository _packageRepo;
        private readonly Random _random = new Random();
        private readonly IConfiguration _configuration;

        public TransactionService(ITransactionRepository repo, IUserRepository userRepo, IConfiguration configuration, IPremiumPackageRepository packageRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
            _configuration = configuration;
            _packageRepo = packageRepo;
        }

        public async Task<List<TransactionDTO>> GetAllByUserIdAsync(int userId)
        {
            var transactions = await _repo.GetAllByUserIdAsync(userId);
            var user = await _userRepo.GetByIdAsync(userId);
            List<TransactionDTO> transactionDTOs = new List<TransactionDTO>();
            foreach (var transaction in transactions)
            {
                transactionDTOs.Add(MapToDTO(transaction));
            }
            foreach (var dto in transactionDTOs)
            {
                dto.FullName = user?.FullName ?? "Unknown";
                dto.Email = user?.Email ?? "Unknown";
            }
            return transactionDTOs;
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
                CreatedDate = transaction.CreatedDate ?? transaction.PurchasedAt,
                ExpiryDate = transaction.ExpiredDate,
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

        public async Task<List<TransactionDTONew>> GetAllTransaction()
        {
            List<TransactionDTONew> transactions = new List<TransactionDTONew>();
            var list = await _repo.GetAllTransactionAsync();
            if (list == null || !list.Any()) return transactions;
            foreach (var item in list)
            {
                var package = await _packageRepo.GetByIdAsync(item.PackageId);
                transactions.Add(new TransactionDTONew
                {
                    TransactionId = item.TransactionId,
                    UserId = item.UserId,
                    FullName = item.User?.FullName ?? "Unknown",
                    Email = item.User?.Email ?? "Unknown",
                    PackagePrice = item.Package?.Price ?? 0,
                    PackageName = package?.PackageName ?? "Unknown",
                    Status = item.Status,
                    CreatedDate = (DateTime)(item.CreatedDate != default ? item.CreatedDate : item.PurchasedAt),
                    PaymentDate = item.PurchasedAt,
                    ExpiryDate = item.Status == "Paid" ? new DateTime(item.PurchasedAt.Year, item.PurchasedAt.Month, item.PurchasedAt.Day)
                        .AddDays(package?.DurationDays ?? 0) : null
                });
            }
            return transactions;
        }

        public async Task<CreateNewTransactionReponse> CreateNewTransactionAsync(string email, int packageId)
        {
            var user = await _userRepo.GetByEmailAsync(email);
            if (user == null) throw new ArgumentException("User not found", nameof(email));            
            var pack = await _packageRepo.GetByIdAsync(packageId);
            if (pack == null) throw new ArgumentException("Package not found", nameof(packageId));
            var transaction = new Repository.Models.Transaction
            {
                UserId = user.UserId,
                PackageId = packageId,
                PaymentMethodId = 1, // Banking is assumed as default
                TransactionCode = GenerateTransactionCode(),
                Amount = pack.Price,
                Status = "Unpaid",
                CreatedDate = DateTime.UtcNow,
            };
            var createdTransaction = await _repo.CreateAsync(transaction);
            return new CreateNewTransactionReponse
            {
                TransactionId = createdTransaction.TransactionId,
                UserId = user.UserId,
                PackageId = packageId,
                Status = "Unpaid",
                CreatedDate = DateTime.UtcNow
            };
        }

        public async Task<TransactionDTONew?> GetTransactionByIdAsync(int transactionId)
        {
            var transaction = await _repo.GetTransactionByIdAsync(transactionId);
            if (transaction == null) return null;
            var package = await _packageRepo.GetByIdAsync(transaction.PackageId);
            TransactionDTONew transactionDTO = new TransactionDTONew
            {
                TransactionId = transaction.TransactionId,
                UserId = transaction.UserId,
                FullName = transaction.User?.FullName ?? "Unknown",
                Email = transaction.User?.Email ?? "Unknown",
                PackagePrice = package?.Price ?? 0,
                PackageName = package?.PackageName ?? "Unknown",
                Status = transaction.Status,
                CreatedDate = (DateTime)(transaction.CreatedDate != default ? transaction.CreatedDate : transaction.PurchasedAt),
                PaymentDate = transaction.PurchasedAt,
                ExpiryDate = transaction.Status == "Paid" ? new DateTime(transaction.PurchasedAt.Year, transaction.PurchasedAt.Month, transaction.PurchasedAt.Day).AddDays(package?.DurationDays ?? 0) : null
            };
            return transactionDTO;
        }

        public async Task<List<TransactionDTONew>?> GetTransactionByUserIdAsync(int userId)
        {
            List<TransactionDTONew> transactions = new List<TransactionDTONew>();
            var items = await _repo.GetAllByUserIdAsync(userId);
            if (items == null) return new List<TransactionDTONew>();
            foreach (var item in items)
            {
                var package = await _packageRepo.GetByIdAsync(item.PackageId);
                transactions.Add(new TransactionDTONew
                {
                    TransactionId = item.TransactionId,
                    UserId = item.UserId,
                    FullName = item.User?.FullName ?? "Unknown",
                    Email = item.User?.Email ?? "Unknown",
                    PackagePrice = package?.Price ?? 0,
                    PackageName = package?.PackageName ?? "Unknown",
                    Status = item.Status,
                    CreatedDate = (DateTime)(item.CreatedDate != default ? item.CreatedDate : item.PurchasedAt),
                    PaymentDate = item.PurchasedAt,
                    ExpiryDate = item.Status == "Paid" ? new DateTime(item.PurchasedAt.Year, item.PurchasedAt.Month, item.PurchasedAt.Day).AddDays(package?.DurationDays ?? 0) : null
                });
            }
            return transactions;
        }

        public async Task<TransactionDTONew> UpdateStatuePaidAsync(int transactionId, int userId, int packageId)
        {
            var transaction = await _repo.GetByIdAsync(transactionId, userId);
            if (transaction == null) throw new ArgumentException("Transaction not found", nameof(transactionId));
            var package = await _packageRepo.GetByIdAsync(packageId);
            if (package == null) throw new ArgumentException("Package not found", nameof(packageId));
            transaction.Status = "Paid";
            transaction.PurchasedAt = DateTime.UtcNow;
            transaction.ExpiredDate = new DateTime(transaction.PurchasedAt.Year, transaction.PurchasedAt.Month, transaction.PurchasedAt.Day)
                .AddDays(package.DurationDays);
            var updatedTransaction = await _repo.UpdateTransactionAsync(transaction);
            if (updatedTransaction == null) throw new InvalidOperationException("Failed to update transaction status");
            return updatedTransaction;
        }

        public async Task<TransactionDTONew> UpdateStatueExpiredAsync(int transactionId)
        {
            var trans = await _repo.GetTransactionByIdAsync(transactionId);
            if (trans == null) throw new ArgumentException("Transaction not found", nameof(transactionId));
            trans.Status = "Expired";
            var updatedTransaction = await _repo.UpdateTransactionAsync(trans);
            if (updatedTransaction == null) throw new InvalidOperationException("Failed to update transaction status");
            return updatedTransaction;
        }

        public async Task<bool> DeleteTransactionAsync(int transactionId)
        {
            return await _repo.DeleteTransactionAsync(transactionId);
        }
    }
}