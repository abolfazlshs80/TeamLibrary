using FluentValidation.Results;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net;
using TeamLibrary.API.Shared.Tools.Api;

namespace TeamLibrary.API.Shared.Contracts;


public interface IEndpoint 
{
    void MapEndpoint(IEndpointRouteBuilder app);
}
public abstract class BaseEndpoint
{
    protected Ok<ApiResponse> Ok(string message)
      => TypedResults.Ok(new ApiResponse(message));

    protected IResult Ok(object? data)
        => TypedResults.Ok(new ApiResponse(data));

    protected IResult Ok(object data, string message)
        => TypedResults.Ok(new ApiResponse(data, message));

    protected IResult BadRequest(string message)
        => TypedResults.BadRequest(new ApiResponse(message, HttpStatusCode.BadRequest));

    protected IResult BadRequest(string[] messages)
        => TypedResults.BadRequest(new ApiResponse(messages));

    protected IResult BadRequest(ValidationResult result)
        => BadRequest(result.Errors.Select(e => e.ErrorMessage).ToArray());

    protected IResult NotFound(string message)
        => TypedResults.NotFound(new ApiResponse(message, HttpStatusCode.NotFound));

    protected IResult Unauthorized(string message = "Unauthorized")
        => TypedResults.Unauthorized();
}
