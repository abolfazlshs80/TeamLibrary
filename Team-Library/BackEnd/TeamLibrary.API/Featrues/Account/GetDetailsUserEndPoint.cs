using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Account;

public static class GetDetailsUserEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/GetDetailsUser", handler: async (
                
                     HttpContext context
                ) =>
            {
                ////validation
                //(bool isValid, string errorMessage) resultError =
                //               MapEndpointValidationResult<modeltype>.Validate(request);

                //if (!resultError.isValid)
                //    return BadRequest(resultError.errorMessage);


                return Ok(12);

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
        }
    }
}