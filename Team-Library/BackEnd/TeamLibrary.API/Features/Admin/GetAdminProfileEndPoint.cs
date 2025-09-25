using DrMeet.Api.Shared.Services.JwtService;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;

namespace TeamLibrary.API.Features.Admin
{
    public static class GetAdminProfileEndPoint
    {
        public class EndPoint : BaseEndpoint, IEndpoint
        {
            public void MapEndpoint(IEndpointRouteBuilder app)
            {
                app.MapGet($"{ApiInfo.Prefix}/profile", handler: async (
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

                    var adminProfile = await adminService.GetAdminProfileAsync(userId);
                    if (adminProfile == null)
                    {
                        return NotFound("??????? ????? ???? ???");
                    }

                    return Ok(adminProfile, "??????? ????? ?? ?????? ?????? ??");
                })
                .RequireAuthorization()
                .WithTags(ApiInfo.Tag)
                .WithName("GetAdminProfile")
                .WithDescription("?????? ??????? ??????? ????? ???? ??????? ???? ? ?????????");
            }
        }
    }
}