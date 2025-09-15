using DrMeet.Api.Shared.Services.JwtService;
using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Featrues.Account.DTOs;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Implementation;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Account;

public static class GetDetailsUserEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/GetDetailsUser", handler: async (
              [FromServices] IJwtService jwtService,
                [FromServices] IUserService userService,
                     HttpContext context
                ) =>
            {

                var authHeader = context.Request.Headers["Authorization"].ToString();

                var model = new DetailsUserDto();

                var token = authHeader.Substring("Bearer ".Length).Trim();
                var result = jwtService.ExteractToken(token);
                var user = await userService.GetUserDetails(result.id);
                if(user.IsError)
                    return BadRequest(user.FirstError.Description);
                if (result.userType == UserType.USER || result.userType == UserType.ADMIN)
                {
                    return Ok(new { userType = result.userType, user = user.Value });
                }
                else
                    return BadRequest("توکن نا معتبر است");

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag)
                .RequireAuthorization();
        }
    }
}
