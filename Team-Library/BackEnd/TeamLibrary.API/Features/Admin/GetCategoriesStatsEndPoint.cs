using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using DrMeet.Api.Shared.Services.JwtService;

namespace TeamLibrary.API.Featrues.Admin
{
    public static class GetCategoriesStatsEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/categories/stats", handler: async (
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

                    var dashboard = await adminService.GetAdminDashboardAsync(new Features.Admin.DTOs.Request.GetAdminDashboardRequestDto { UserId = userId });
                    
                    return Ok(new 
                    {
                        dashboard.Statistics.TotalCategories,
                        dashboard.Statistics.CategoryStats
                    }, "آمار دسته‌بندی‌ها با موفقیت دریافت شد");
                })
                .RequireAuthorization()
                .WithTags(ApiInfo.Tag)
                .WithName("GetCategoriesStats")
                .WithDescription("دریافت آمار کامل دسته‌بندی‌ها شامل تعداد کل و آمار هر دسته‌بندی");
            }
        }
    }
}