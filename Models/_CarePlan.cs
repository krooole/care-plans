using System.ComponentModel.DataAnnotations;

namespace carePlans.Models {
    public class _CarePlan {

        [Required]
        public int Id {get; set; }

        [Required]
        [StringLength(450)]
        public string Title {get;set;}

        [Required]
        [StringLength(450)]
        public string PatientName {get;set;}

        [Required]
        [StringLength(450)]
        public string UserName {get;set;}

        [Required]
        public DateTime ActualStartDate {get;set;}

        [Required]
        public DateTime TargetDate {get;set;}        
        
        [Required]
        [StringLength(1000)]
        public string Reason {get;set;}
        
        public string Action {get;set;}

        [Required]
        public bool Completed {get;set;}

        [EndDateRules]
        public DateTime? EndDate {get;set;}
        
        [OutcomeRules]
        public string Outcome {get;set;}

    }

    public class EndDateRules : ValidationAttribute {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var carePlan = (_CarePlan) validationContext.ObjectInstance;
            if(value!=null && (DateTime)value<carePlan.ActualStartDate) {
                return new ValidationResult("End date cannot be before Start date");
            }
            if(value==null && carePlan.Completed) {
                return new ValidationResult("End date is mandatory when Completed is set to 'yes'");
            }
            return ValidationResult.Success;
        }
    }

    public class OutcomeRules : ValidationAttribute {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var carePlan = (_CarePlan) validationContext.ObjectInstance;
            if(carePlan.Completed && (value==null || ((string)value)=="")) {
                return new ValidationResult("Outcome is mandatory when Completed is set to 'yes'");
            }
            return ValidationResult.Success;
        }
    }

}