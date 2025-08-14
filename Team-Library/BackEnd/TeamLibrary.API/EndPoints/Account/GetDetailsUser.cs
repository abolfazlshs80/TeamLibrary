using TeamLibrary.API.Contracts;

namespace TeamLibrary.API.EndPoints.Account;

public static class GetDetailsUser
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/GetDetailsUser", handler: async (
                
                     HttpContext context
                ) =>
            {
             
                    return Ok(12);

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
        }
    }
}