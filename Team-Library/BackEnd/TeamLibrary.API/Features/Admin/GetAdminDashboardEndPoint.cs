using TeamLibrary.API.Features.Admin.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using DrMeet.Api.Shared.Services.JwtService;

namespace TeamLibrary.API.Features.Admin
{
    public static class GetAdminDashboardEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/dashboard", handler: async (
                    IAdminService adminService,
                    IJwtService jwtService,
                    HttpContext context
                ) =>
                {
                    // Validate admin access using JWT token
                    var (isAdmin, userId, errorMessage) = ValidateAdminAccess(context, jwtService);
                    if (!isAdmin)
                    {
                        return Unauthorized(errorMessage);
                    }

                    var request = new GetAdminDashboardRequestDto { UserId = userId };
                    var dashboard = await adminService.GetAdminDashboardAsync(request);
                    return Ok(dashboard, "??????? ????? ?? ?????? ???????? ??");
                })
                .RequireAuthorization()
                .WithTags(ApiInfo.Tag)
                .WithName("GetAdminDashboard")
                .WithDescription("?????? ??????? ??????? ??? ????? ???? ???? ???????? ???????????? ? ????????");
            }
        }
    }
}