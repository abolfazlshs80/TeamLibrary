namespace TeamLibrary.API.Shared.Middleware;

using global::TeamLibrary.API.Shared.Tools.Api;
using System.Net;

using System.Text.Json;


public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;
    private readonly IWebHostEnvironment _env;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger, IWebHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context); // اجرای مرحله بعدی
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }
    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        var correlationId = Guid.NewGuid().ToString("N");
        _logger.LogError(ex, "[{CorrelationId}] {Path} {Method}", correlationId, context.Request.Path, context.Request.Method);

        context.Response.ContentType = "application/json";

        var status = HttpStatusCode.InternalServerError;
        var message = "Something went wrong";

        switch (ex)
        {
            case UnauthorizedAccessException:
                status = HttpStatusCode.Unauthorized;
                message = "Unauthorized";
                break;

            case KeyNotFoundException:
                status = HttpStatusCode.NotFound;
                message = ex.Message;
                break;

            case ArgumentException:
                status = HttpStatusCode.BadRequest;
                message = ex.Message;
                break;

            case BadHttpRequestException badRequestEx:
                // این برای JSON نامعتبر
                status = HttpStatusCode.BadRequest;
                message = "Invalid JSON format: " + badRequestEx.Message;
                break;

            case System.Text.Json.JsonException jsonEx:
                status = HttpStatusCode.BadRequest;
                message = "Invalid JSON format: " + jsonEx.Message;
                break;
        }

        context.Response.StatusCode = (int)status;

        var response = new ApiResponse(
            message: message,
            status: status,
            errors: status == HttpStatusCode.OK ? Array.Empty<string>() : new[] { message },
            data: null
        );

        // ارسال StackTrace در محیط Development
        if (!_env.IsProduction())
        {
            response.Data = new { ex.StackTrace, CorrelationId = correlationId };
        }

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json);
    }

}
