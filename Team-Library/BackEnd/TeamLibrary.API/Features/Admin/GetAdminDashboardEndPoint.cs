using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using DrMeet.Api.Shared.Services.JwtService;
using TeamLibrary.API.Featrues.Admin.DTOs.Request;

namespace TeamLibrary.API.Featrues.Admin
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