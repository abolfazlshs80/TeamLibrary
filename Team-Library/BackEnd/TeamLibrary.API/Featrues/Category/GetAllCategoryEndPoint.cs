using TeamLibrary.API.Service.Interface;
using TeamLibrary.API.Shared.Contracts;
using TeamLibrary.API.Shared.Tools.Helper;

namespace TeamLibrary.API.Featrues.Category;

public static class GetAllCategoryEndPoint
{
    public class EndPoint : BaseEndpoint, IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet($"{ApiInfo.Prefix}/GetAllCategory", handler: async (
                ICategoryService service,
                     HttpContext context
                ) =>
            {
                ////validation
                //(bool isValid, string errorMessage) resultError =
                //               MapEndpointValidationResult<modeltype>.Validate(request);

                //if (!resultError.isValid)
                //    return BadRequest(resultError.errorMessage);
                var categories = await service.GetAllCategoryAsync();

                return Ok(categories);

            })
                //.RequireAuthorization()
                .WithTags(ApiInfo.Tag);
        }
    }
}