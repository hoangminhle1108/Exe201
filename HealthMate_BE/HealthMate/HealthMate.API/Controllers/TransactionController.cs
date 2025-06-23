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

        [HttpGet("all_transactions")]
        public IActionResult GetAll()
        {
            try
            {
                var transactions = _transactionService.GetAllTransaction().Result;
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpGet("{transactionId}")]
        public IActionResult Get(int transactionId)
        {
            try
            {
                var transaction = _transactionService.GetTransactionByIdAsync(transactionId).Result;
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

        [HttpPost("create_transaction")]
        public async Task<IActionResult> CreateTransaction([FromBody] NewTransRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var userId = GetUserId();
                var transaction = await _transactionService.CreateNewTransactionAsync(request.Email, request.PackageId);
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

        [HttpPut("update_status_to_paid")]
        public async Task<IActionResult> UpdateStatusToPaid([FromBody] UpdatePayStatusRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var transaction = await _transactionService.UpdateStatuePaidAsync(request.TransactionId, request.UserId, request.PackageId);
                if (transaction == null)
                {
                    return NotFound(new { message = "Transaction not found" });
                }
                return Ok(transaction);
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

        [HttpPut("update_status_to_expired/{transactionId}")]
        public async Task<IActionResult> UpdateStatusToExpired(int transactionId)
        {
            if (transactionId <= 0)
            {
                return BadRequest("Invalid transaction ID");
            }
            try
            {
                var transaction = await _transactionService.UpdateStatueExpiredAsync(transactionId);
                if (transaction == null)
                {
                    return NotFound(new { message = "Transaction not found" });
                }
                return Ok(transaction);
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


    }
}
