using DrMeet.Api.Shared.Services.JwtService;
using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Account.DTOs.Request;
using TeamLibrary.API.Featrues.Account.DTOs.Response;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Account;

public static class LoginEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost($"{ApiInfo.Prefix}/Login", handler: async (
                [FromBody] LoginRequestDto request,
                [FromServices] IJwtService jwtService,
                [FromServices] IUserService userService,
                [FromServices] IRateLimitService rateLimitService,
                HttpContext context) =>
            {
                var clientIp = GetClientIpAddress(context);
                var identifier = $"{request.UserName}_{clientIp}";

                var isAllowed = await rateLimitService.IsAllowedAsync(identifier);
                if (!isAllowed)
                {
                    var (isBlocked, remainingTime) = await rateLimitService.GetBlockStatusAsync(identifier);
                    if (isBlocked)
                    {
                        return BadRequest($"تعداد تلاش‌های ناموفق زیاد است. لطفاً {remainingTime.Minutes} دقیقه و {remainingTime.Seconds} ثانیه دیگر تلاش کنید.");
                    }
                }

                var authResult = await userService.AuthenticateUserAsync(request.UserName, request.Email, request.Password);

                if (authResult.IsError)
                {
                    await rateLimitService.RecordFailedAttemptAsync(identifier);
                    return BadRequest("نام کاربری، ایمیل یا رمز عبور نامعتبر است");
                }

                var user = authResult.Value;

                await rateLimitService.ResetAttemptsAsync(identifier);

                var tokenResult = jwtService.CreateToken(user.Id, user.UserType);

                var response = new LoginResponseDto
                {
                    Token = tokenResult.Token,
                    ExpireDate = tokenResult.ExpireDate,
                    UserType = user.UserType,
                    UserId = user.Id
                };

                return Ok(response, "ورود با موفقیت انجام شد");
            })
            .AddEndpointFilter<ValidationFilter<LoginRequestDto>>()
            .WithTags(ApiInfo.Tag)
            .WithName("Login");
        }

        private static string GetClientIpAddress(HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();

            if (context.Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                ipAddress = context.Request.Headers["X-Forwarded-For"].FirstOrDefault()?.Split(',').FirstOrDefault()?.Trim();
            }

            if (string.IsNullOrEmpty(ipAddress) && context.Request.Headers.ContainsKey("X-Real-IP"))
            {
                ipAddress = context.Request.Headers["X-Real-IP"].FirstOrDefault();
            }

            return ipAddress ?? "unknown";
        }
    }
}