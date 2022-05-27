using carePlans.Models;
using Newtonsoft.Json;

namespace carePlans.DataAccess {
    public class JsonCarePlanRepo:ICarePlanRepo {

        // This is a mockup implementation that performs poorly and would not handle concurrency properly
        // it's meant solely to demonstrate the structure and communications of the app
        private string _filepath = Path.Combine(Path.GetTempPath(), "carePlans.json");

        private List<CarePlan> readFromFile() {
            System.Console.WriteLine($"read from {_filepath}");
            if(File.Exists(_filepath)) {
                var jsonSrc = File.ReadAllText(_filepath);
                if(string.IsNullOrEmpty(jsonSrc)) return new List<CarePlan>();
                var carePlans = JsonConvert.DeserializeObject<List<CarePlan>>(jsonSrc);
                if(carePlans==null) carePlans = new List<CarePlan>();
                return carePlans;
            }
            else {
                return new List<CarePlan>();
            }
        }
        private void persist(List<CarePlan> newContent) {
            string jsonSrc = JsonConvert.SerializeObject(newContent);
            File.WriteAllText(_filepath, jsonSrc);
        }

        public IEnumerable<CarePlan> All() {
            return readFromFile();
        }

        public CarePlan GetById(int id) {
            var carePlans = readFromFile();
            var carePlan = carePlans.Where(cp=>cp.Id==id).FirstOrDefault();
            return carePlan;
        }

        public CarePlan Add(CarePlan carePlan) {
            var carePlans = readFromFile();
            var ids = carePlans.Select(p=>p.Id);
            int newId;
            if(ids.Count()>0) newId = ids.Max()+1;
            else newId = 1;
            carePlan.Id = newId;
            carePlans.Add(carePlan);
            persist(carePlans);
            return carePlan;
        }
        public void DeleteById(int id) {
            var carePlans = readFromFile();
            carePlans = carePlans.Where(cp=>cp.Id!=id).ToList();
            persist(carePlans);
        }
        public CarePlan Update(CarePlan carePlan) {
            var carePlans = readFromFile();
            var replaceIx = carePlans.FindIndex(cp=>cp.Id==carePlan.Id);
            carePlans[replaceIx] = carePlan;
            persist(carePlans);
            return carePlan;
        }
    }
}