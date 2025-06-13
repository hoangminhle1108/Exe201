using HealthMate.Repository.DTOs.PremiumPackage;
using HealthMate.Services.Interface.PremiumPackage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthMate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PremiumPackageController : ControllerBase
    {
        private readonly IPremiumPackageService _service;
        public PremiumPackageController(IPremiumPackageService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var packages = await _service.GetAllAsync();
            return Ok(packages);
        }

        [HttpGet("{packageId:int}")]
        public async Task<IActionResult> GetById(int packageId)
        {
            var package = await _service.GetByIdAsync(packageId);
            if (package == null) return NotFound();
            return Ok(package);
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveSubscribersCount()
        {
            var activeSubscribers = await _service.GetActivePackagesAsync();
            if (activeSubscribers == null) return NotFound();
            return Ok(activeSubscribers);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePremiumPackageRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var createdPackage = await _service.CreateAsync(request);
                return CreatedAtAction(nameof(GetById), new { packageId = createdPackage.PackageId }, createdPackage);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{packageId:int}")]
        public async Task<IActionResult> Update(int packageId, [FromBody] UpdatePremiumPackageRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updatedPackage = await _service.UpdateAsync(packageId, request);
            if (updatedPackage == null) return NotFound();
            return Ok(updatedPackage);
        }

        [HttpDelete("{packageId:int}")]
        public async Task<IActionResult> Delete(int packageId)
        {
            var deleted = await _service.DeleteAsync(packageId);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
