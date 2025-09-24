using TeamLibrary.API.Features.Admin.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;

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
                    [AsParameters] GetAdminDashboardRequestDto request,
                    HttpContext context
                ) =>
                {
                    // Check if user is admin
                    var isAdmin = await adminService.IsUserAdminAsync(request.UserId);
                    if (!isAdmin)
                    {
                        return Unauthorized("??? ????? ????? ?????? ????");
                    }

                    var dashboard = await adminService.GetAdminDashboardAsync(request);
                    return Ok(dashboard, "??????? ?? ?????? ?????? ??");
                })
                .RequireAuthorization()
                .WithTags(ApiInfo.Tag)
                .WithName("GetAdminDashboard");
            }
        }
    }
}