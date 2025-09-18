using System.ComponentModel.DataAnnotations;
using TeamLibrary.API.Featrues.Account.DTOs.Request;

namespace TeamLibrary.API.Shared.Tools.Helper;

public static class MapEndpointValidationResult<T> where T : class
{
    public static (bool IsValid, string[] ErrorMessages) Validate(T model)
    {
        var validationResults = new List<ValidationResult>();
        var validationContext = new ValidationContext(model);

        bool isValid = Validator.TryValidateObject(model, validationContext, validationResults, true);

        if (!isValid)
        {
            var errorMessages = validationResults.Select(vr => vr.ErrorMessage ?? "خطای نامشخص").ToArray();
            return (false, errorMessages);
        }

        if (model is LoginRequestDto loginRequest)
        {
            var additionalErrors = new List<string>();

            if (string.IsNullOrWhiteSpace(loginRequest.UserName))
            {
                additionalErrors.Add("نام کاربری الزامی است");
            }
            if (string.IsNullOrWhiteSpace(loginRequest.Password) || loginRequest.Password.Length < 6)
            {
                additionalErrors.Add("رمز عبور باید حداقل 6 کاراکتر باشد");
            }

            if (additionalErrors.Any())
            {
                return (false, additionalErrors.ToArray());
            }
        }

        return (true, Array.Empty<string>());
    }
}
