using HealthMate.Repository.DTOs.HealthMetric;
using HealthMate.Services.Interface.HealthMetric;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace HealthMate.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HealthMetricController : ControllerBase
    {
        private readonly IHealthMetricService _service;
        public HealthMetricController(IHealthMetricService service) => _service = service;

        private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        [HttpGet]
        public async Task<ActionResult<List<HealthMetricDTO>>> GetAll()
        {
            var userId = GetUserId();
            var metrics = await _service.GetAllByUserIdAsync(userId);
            return Ok(metrics);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HealthMetricDTO>> GetById(int id)
        {
            var userId = GetUserId();
            var metric = await _service.GetByIdAsync(id, userId);
            if (metric == null) return NotFound();
            return Ok(metric);
        }

        [HttpPost]
        public async Task<ActionResult<HealthMetricDTO>> Create(CreateHealthMetricRequest request)
        {
            var userId = GetUserId();
            var metric = await _service.CreateAsync(userId, request);
            return CreatedAtAction(nameof(GetById), new { id = metric.MetricId }, metric);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HealthMetricDTO>> Update(int id, UpdateHealthMetricRequest request)
        {
            var userId = GetUserId();
            var metric = await _service.UpdateAsync(userId, id, request);
            if (metric == null) return NotFound();
            return Ok(metric);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var result = await _service.DeleteAsync(userId, id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
} 