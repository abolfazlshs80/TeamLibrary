using DrMeet.Api.Shared.Services.JwtService;
using Microsoft.AspNetCore.Mvc;
using TeamLibrary.API.Featrues.Account.DTOs.Request;
using TeamLibrary.API.Featrues.Account.DTOs.Response;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Service.Interface;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Account;

public static class RegisterUserEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost($"{ApiInfo.Prefix}/register",
                async (RegisterRequestDto request, IUserService userService, IJwtService jwtService) =>
                {
                
                    var result = await userService.RegisterAsync(request.UserName, request.FullName, request.Password, request.Email);

                    if (result.IsError)
                        return BadRequest(result.FirstError.Description);

                    var user = result.Value;

                  
                    var token = jwtService.CreateToken(user.Id, user.UserType);

                   
                    return Ok(new
                    {
                        AccessToken = token.Token,
                        ExpiresAt = token.ExpireDate
                    });
                })
                .AddEndpointFilter(new ValidationFilter<RegisterRequestDto>())
                .WithTags(ApiInfo.Tag);
        }
    }
}
