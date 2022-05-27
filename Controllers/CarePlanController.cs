using carePlans.DataAccess;
using carePlans.Models;
using Microsoft.AspNetCore.Mvc;

namespace carePlans.Controllers;

[ApiController]
[Route("[controller]")]
public class CarePlanController : ControllerBase
{
    private readonly ILogger<CarePlanController> _logger;
    private readonly ICarePlanRepo _repo;

    public CarePlanController(ILogger<CarePlanController> logger, ICarePlanRepo repo)
    {
        _logger = logger;
        _repo = repo;
    }

    [HttpGet]
    public IEnumerable<CarePlan> Get()
    {
        return _repo.All();
    }

    [HttpGet("{id}")]
    public CarePlan GetById(int id)
    {
        return _repo.GetById(id);
    }

    [HttpPost]
    public CarePlan Save(CarePlan updatedPlan) {
        if(updatedPlan.Id!=0)
            return _repo.Update(updatedPlan);
        else
            return _repo.Add(updatedPlan);
    }

    [HttpDelete("{id}")]
    public void Delete(int id) {
        _repo.DeleteById(id);
    }
}
