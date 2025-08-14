using System.ComponentModel.DataAnnotations;

namespace DrMeet.Api.Shared.Helpers
{
    public class MapEndpointValidationResult<T>
    {
        public static (bool isValid, string errorMessage) Validate(T _request)
        {
            var validationResults = new List<ValidationResult>();
            var context = new ValidationContext(_request);
            bool isValid = Validator.TryValidateObject(_request, context, validationResults, true);

            if (!isValid)
            {
                var errors = validationResults.Select(v => v.ErrorMessage).ToList();
                return (false, string.Join(",", errors));
            }

            return (true, string.Empty);
        }
    }
}
