using carePlans.Models;

namespace carePlans.DataAccess {
    public interface ICarePlanRepo {
        public IEnumerable<CarePlan> All();
        public CarePlan GetById(int id);
        public CarePlan Add(CarePlan carePlan);
        public void DeleteById(int id);
        public CarePlan Update(CarePlan carePlan);
    }
}