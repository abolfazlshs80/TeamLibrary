using DrMeet.Api.Shared.Services.JwtService;
using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Data.Models;
using TeamLibrary.API.Shared.Contracts;

namespace TeamLibrary.API.Featrues.Account;

public static class CreateTokenEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/CreateToken", handler: async (

            [FromServices]    IJwtService jwtService,
                     HttpContext context
                ) =>
            {


                return Ok(jwtService.CreateToken(1, UserType.USER));

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
        }
    }
}