using DrMeet.Api.Shared.Services.JwtService;
using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
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
                // ?????? IP ????? ???? Rate Limiting
                var clientIp = GetClientIpAddress(context);
                var identifier = $"{request.Token.Substring(0, Math.Min(10, request.Token.Length))}_{clientIp}";

                // ????? Rate Limit
                var isAllowed = await rateLimitService.IsAllowedAsync(identifier);
                if (!isAllowed)
                {
                    var (isBlocked, remainingTime) = await rateLimitService.GetBlockStatusAsync(identifier);
                    if (isBlocked)
                    {
                        return BadRequest($"????? ???????? ?????? ???? ???. ????? {remainingTime.Minutes} ????? ? {remainingTime.Seconds} ????? ???? ???? ????.");
                    }
                }

                // ?????????? ???? ? ?????? ??????? ?????
                var authResult = await userService.AuthorizeAsync(request.Token);

                if (authResult.IsError)
                {
                    // ??? ???? ??????
                    await rateLimitService.RecordFailedAttemptAsync(identifier);

                    return BadRequest("???? ??????? ??? ?? ????? ??? ???");
                }

                var user = authResult.Value;

                // ????? ????? ???? ?????? (???????)
                if (!IsUserActive(user))
                {
                    await rateLimitService.RecordFailedAttemptAsync(identifier);
                    return BadRequest("???? ?????? ??????? ???");
                }

                // ???? ???? ???????? ??????
                await rateLimitService.ResetAttemptsAsync(identifier);

                // Extract token expiration info
                var (userType, userId) = jwtService.ExteractToken(request.Token);

                var response = new LoginResponseDto
                {
                    Token = request.Token, // Return the same token
                    ExpireDate = DateTime.UtcNow.AddDays(1), // Default expiration, could be extracted from token
                    UserType = user.UserType,
                    Email = user.Email,
                    UserId = user.Id
                };

                return Ok(response, "???? ?? ?????? ????? ??");
            })
            .AddEndpointFilter<ValidationFilter<LoginRequestDto>>()
            .WithTags(ApiInfo.Tag)
            .WithName("Login")
            .WithSummary("???? ????? ?? ????")
            .WithDescription("???? ????? ?? ??????? ?? ???? ????? ????? ?? Rate Limiting");
        }

        private static string GetClientIpAddress(HttpContext context)
        {
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();

            // ????? X-Forwarded-For header ???? proxy ??
            if (context.Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                ipAddress = context.Request.Headers["X-Forwarded-For"].FirstOrDefault()?.Split(',').FirstOrDefault()?.Trim();
            }

            // ????? X-Real-IP header
            if (string.IsNullOrEmpty(ipAddress) && context.Request.Headers.ContainsKey("X-Real-IP"))
            {
                ipAddress = context.Request.Headers["X-Real-IP"].FirstOrDefault();
            }

            return ipAddress ?? "unknown";
        }

        private static bool IsUserActive(Users user)
        {
            // ??? ??????? ?? ??? Users ???? IsActive ????
            // ??? ?????? ??? ?? ?? ??? ????
            return true; // user.IsActive;
        }
    }
}