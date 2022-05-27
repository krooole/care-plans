using System.ComponentModel.DataAnnotations;

namespace carePlans.Models {
    public class CarePlan: IValidatableObject {

        public int Id {get; set; }
        public string Title {get;set;}
        public string PatientName {get;set;}
        public string UserName {get;set;}
        public DateTime? ActualStartDate {get;set;}
        public DateTime? TargetDate {get;set;}        
        public string Reason {get;set;}
        public string Action {get;set;}
        public bool? Completed {get;set;}
        public DateTime? EndDate {get;set;}
        public string Outcome {get;set;}

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext) {

            if(string.IsNullOrEmpty(Title)) yield return new ValidationResult("Title is required", new[]{"Title"});
            if(!string.IsNullOrEmpty(Title) && Title.Length>450) yield return new ValidationResult("Title may not exceed 450 characters", new[]{"Title"});

            if(string.IsNullOrEmpty(PatientName)) yield return new ValidationResult("Patient Name is required", new[]{"PatientName"});
            if(!string.IsNullOrEmpty(PatientName) && PatientName.Length>450) yield return new ValidationResult("Patient Name may not exceed 450 characters", new[]{"PatientName"});

            if(string.IsNullOrEmpty(UserName)) yield return new ValidationResult("User Name is required", new[]{"UserName"});
            if(!string.IsNullOrEmpty(UserName) && UserName.Length>450) yield return new ValidationResult("User Name may not exceed 450 characters", new[]{"UserName"});

            if(!ActualStartDate.HasValue) yield return new ValidationResult("Start Date is required", new[]{"StartDate"});

            if(!TargetDate.HasValue) yield return new ValidationResult("Target Date is required", new[]{"TargetDate"});

            if(string.IsNullOrEmpty(Reason)) yield return new ValidationResult("Reason is required", new[]{"Reason"});
            if(!string.IsNullOrEmpty(Reason) && Reason.Length>450) yield return new ValidationResult("Reason may not exceed 1000 characters", new[]{"Reason"});

            if(string.IsNullOrEmpty(Action)) yield return new ValidationResult("Action is required", new[]{"Action"});
            if(!string.IsNullOrEmpty(Action) && Action.Length>450) yield return new ValidationResult("Action may not exceed 1000 characters", new[]{"Action"});
            
            if(!Completed.HasValue) yield return new ValidationResult("Completed attribute is required", new[]{"Completed"});

            if(Completed.HasValue && Completed.Value && !EndDate.HasValue) 
                yield return new ValidationResult("End Date is required when 'Completed' is set to 'Yes'", new[]{"EndDate"});
            if(EndDate.HasValue && ActualStartDate.HasValue && EndDate.Value<ActualStartDate.Value) 
                yield return new ValidationResult("End Date cannot be before Start Date", new[]{"EndDate"});

            if(Completed.HasValue && Completed.Value && string.IsNullOrEmpty(Outcome)) 
                yield return new ValidationResult("Outcome is required when 'Completed' is set to 'Yes'", new[]{"Outcome"});            
            if(!string.IsNullOrEmpty(Outcome) && Outcome.Length>1000)
                yield return new ValidationResult("Outcome may not exceed 1000 characters", new[]{"Outcome"});
        }

    }


}