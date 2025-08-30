using TeamLibrary.API.Shared.Contracts;

namespace TeamLibrary.API.Shared.Tools.Helper;


public class ValidationFilter<TRequest> : BaseEndpoint, IEndpointFilter where TRequest : class
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = context.Arguments.OfType<TRequest>().FirstOrDefault();
        if (request is null)
            return  BadRequest("درخواست نامعتبر است");

        var (isValid, errorMessage) = MapEndpointValidationResult<TRequest>.Validate(request);
        if (!isValid)
            return BadRequest(errorMessage);

        return await next(context);
    }
}
