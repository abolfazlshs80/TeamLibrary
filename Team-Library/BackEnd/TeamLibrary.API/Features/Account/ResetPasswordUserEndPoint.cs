using DrMeet.Api.Shared.Services.JwtService;
using TeamLibrary.API.Featrues.Account.DTOs.Request;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Account;

public static class ResetPasswordUserEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost($"{ApiInfo.Prefix}/ResetPassword",
                async (ResetPasswordRequestDto request, IUserService userService, IJwtService jwtService) =>
                {

                    var result = await userService.ResetPassword(request);

                    if (result.IsError)
                        return BadRequest(result.FirstError.Description);

                    return Ok(result.Value);
                })
                .AddEndpointFilter(new ValidationFilter<ResetPasswordRequestDto>())
                .WithTags(ApiInfo.Tag);
        }
    }
}
