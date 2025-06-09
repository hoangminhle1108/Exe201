using HealthMate.Repository.DTOs.Transaction;
using HealthMate.Services.Helpers;
using HealthMate.Services.Interface.Transaction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HealthMate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IConfiguration _configuration;
        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        public TransactionController(ITransactionService transactionService, IConfiguration configuration)
        {
            _transactionService = transactionService;
            _configuration = configuration;
        }

        [HttpGet("all_transactions/{userId}")]
        public IActionResult GetAllFromUser(int userId) 
        {
            try
            {
                var transactions = _transactionService.GetAllByUserIdAsync(userId).Result;
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("transaction/{transactionId}/{userId}")]
        public IActionResult GetById(int transactionId, int userId)
        {
            try
            {
                var transaction = _transactionService.GetByIdAsync(transactionId, userId).Result;
                if (transaction == null)
                {
                    return NotFound(new { message = "Transaction not found" });
                }
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("transaction/create")]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var userId = GetUserId();
                var transaction = await _transactionService.CreateAsync(userId, request);
                return CreatedAtAction(nameof(GetById), new { transactionId = transaction.TransactionId, userId }, transaction);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("transaction/vnpay-return")]
        public async Task<IActionResult> VNPayReturn()
        {
            var vnPay = new VnPayLibrary();
            foreach (var key in Request.Query.Keys)
            {
                if (key.StartsWith("vnp_"))
                    vnPay.AddRequestData(key, Request.Query[key]!);
            }

            string hashSecret = _configuration["VNPay:HashSecret"];
            bool valid = vnPay.ValidateSignature(hashSecret);

            string transactionCode = Request.Query["vnp_TxnRef"];
            string responseCode = Request.Query["vnp_ResponseCode"];

            var transaction = await _transactionService.GetByTransactionCodeAsync(transactionCode);

            if (!valid || transaction == null)
                return BadRequest("Invalid payment");

            if (responseCode == "00")
            {
                await _transactionService.UpdateStatusAsync(transaction.TransactionId, new UpdateTransactionStatusRequest { Status = "Completed" });
                return Redirect("/payment-success");
            }

            await _transactionService.UpdateStatusAsync(transaction.TransactionId, new UpdateTransactionStatusRequest { Status = "Failed" });
            return Redirect("/payment-failed");
        }
    }
}
