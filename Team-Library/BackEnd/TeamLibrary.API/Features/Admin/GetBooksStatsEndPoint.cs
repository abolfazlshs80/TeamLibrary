using DrMeet.Api.Shared.Services.JwtService;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Featrues.Admin
{
    public static class GetBooksStatsEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/books/stats", handler: async (
                    IAdminService adminService,
                    IJwtService jwtService,
                    HttpContext context
                ) =>
                {
                    var (isAdmin, userId, errorMessage) = ValidateAdminAccess(context, jwtService);
                    if (!isAdmin)
                    {
                        return Unauthorized("فقط ادمین اجازه دسترسی دارد");
                    }

                    var dashboard = await adminService.GetAdminDashboardAsync(new Features.Admin.DTOs.Request.GetAdminDashboardRequestDto { UserId = userId });

                    return Ok(new
                    {
                        dashboard.Statistics.TotalBooks,
                        dashboard.Statistics.TopViewedBooks,
                        dashboard.Statistics.TotalViews
                    }, "آمار کتاب‌ها با موفقیت دریافت شد");
                })
                .RequireAuthorization()
                .WithTags(ApiInfo.Tag)
                .WithName("GetBooksStats")
                .WithDescription("دریافت آمار کامل کتاب‌ها شامل تعداد کل، پربازدیدترین کتاب‌ها و مجموع بازدیدها");
            }
        }
    }
}