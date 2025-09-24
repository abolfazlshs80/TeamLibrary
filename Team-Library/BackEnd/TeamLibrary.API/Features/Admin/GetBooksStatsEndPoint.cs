using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Features.Admin
{
    public static class GetBooksStatsEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/books/stats", handler: async (
                    IAdminService adminService,
                    int userId,
                    HttpContext context
                ) =>
                {
                    // Check if user is admin
                    var isAdmin = await adminService.IsUserAdminAsync(userId);
                    if (!isAdmin)
                    {
                        return Unauthorized("فقط ادمین اجازه دسترسی دارد");
                    }

                    var dashboard = await adminService.GetAdminDashboardAsync(new Features.Admin.DTOs.Request.GetAdminDashboardRequestDto { UserId = userId });

                    return Ok(new
                    {
                        TotalBooks = dashboard.Statistics.TotalBooks,
                        TopViewedBooks = dashboard.Statistics.TopViewedBooks,
                        TotalViews = dashboard.Statistics.TotalViews
                    }, "اطلاعات با موفقیت دریافت شد");
                })
                .RequireAuthorization()
                .WithTags(ApiInfo.Tag)
                .WithName("GetBooksStats")
               ;
            }
        }
    }
}